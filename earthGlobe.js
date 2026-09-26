(() => {
  const textureUrl = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=BlueMarble_ShadedRelief_Bathymetry&STYLES=&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=2048&HEIGHT=1024&FORMAT=image/jpeg';
  const state = {
    storms: [],
    selectedStorm: null,
    scenario: null,
    liveTracks: null,
    weatherCells: [],
    layers: {},
    forecastHour: 0
  };
  const handlers = { selectStorm: null, mapClick: null, coordinates: null, failure: null };
  let host = null;
  let earthCanvas = null;
  let overlayCanvas = null;
  let statusElement = null;
  let gl = null;
  let context2d = null;
  let program = null;
  let texture = null;
  let baseEarthImage = null;
  let textureLoaded = false;
  let vertexBuffer = null;
  let indexBuffer = null;
  let indexCount = 0;
  let yaw = 0;
  let pitch = 0;
  let zoom = 1;
  let targetYaw = null;
  let targetPitch = null;
  let animationFrame = 0;
  let resizeObserver = null;
  let pointerStart = null;
  let hitTargets = [];
  let imageRequest = null;
  let supported = false;

  const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const radians = degrees => degrees * Math.PI / 180;

  function setStatus(message, stateName = 'ready') {
    if (!statusElement) return;
    statusElement.textContent = message;
    statusElement.dataset.state = stateName;
  }

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Earth renderer shader failed.';
      gl.deleteShader(shader);
      throw new Error(message);
    }
    return shader;
  }

  function createProgram() {
    const vertexSource = `
      attribute vec3 aPosition;
      attribute vec2 aUv;
      uniform float uYaw;
      uniform float uPitch;
      uniform float uScale;
      uniform float uAspect;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        float cy = cos(uYaw);
        float sy = sin(uYaw);
        float cp = cos(uPitch);
        float sp = sin(uPitch);
        vec3 turned = vec3(cy * aPosition.x + sy * aPosition.z,
                           aPosition.y,
                           -sy * aPosition.x + cy * aPosition.z);
        vec3 normal = vec3(turned.x,
                           cp * turned.y - sp * turned.z,
                           sp * turned.y + cp * turned.z);
        gl_Position = vec4(normal.x * uScale / uAspect,
                           normal.y * uScale,
                           -normal.z,
                           1.0);
        vUv = aUv;
        vNormal = normal;
      }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform sampler2D uEarth;
      uniform float uHasTexture;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 base = texture2D(uEarth, vUv).rgb;
        float light = 0.46 + 0.54 * max(dot(normal, normalize(vec3(-0.38, 0.28, 0.88))), 0.0);
        float limb = pow(1.0 - max(normal.z, 0.0), 2.5);
        vec3 fallback = vec3(0.025, 0.11, 0.20) * (0.78 + 0.22 * max(normal.z, 0.0));
        vec3 surface = mix(fallback, base * light, uHasTexture);
        surface += vec3(0.045, 0.31, 0.52) * limb * 0.36;
        gl_FragColor = vec4(surface, 1.0);
      }
    `;
    const vertex = createShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = createShader(gl.FRAGMENT_SHADER, fragmentSource);
    const result = gl.createProgram();
    gl.attachShader(result, vertex);
    gl.attachShader(result, fragment);
    gl.linkProgram(result);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(result, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(result) || 'Earth renderer could not link.';
      gl.deleteProgram(result);
      throw new Error(message);
    }
    return result;
  }

  function buildSphere() {
    const latitudeSteps = 56;
    const longitudeSteps = 112;
    const vertices = [];
    const indices = [];
    for (let row = 0; row <= latitudeSteps; row += 1) {
      const latitude = Math.PI / 2 - (row / latitudeSteps) * Math.PI;
      const cosLatitude = Math.cos(latitude);
      const sinLatitude = Math.sin(latitude);
      for (let column = 0; column <= longitudeSteps; column += 1) {
        const u = column / longitudeSteps;
        const longitude = u * Math.PI * 2 - Math.PI;
        vertices.push(cosLatitude * Math.sin(longitude), sinLatitude, cosLatitude * Math.cos(longitude), u, 1 - row / latitudeSteps);
      }
    }
    const rowSize = longitudeSteps + 1;
    for (let row = 0; row < latitudeSteps; row += 1) {
      for (let column = 0; column < longitudeSteps; column += 1) {
        const upperLeft = row * rowSize + column;
        const upperRight = upperLeft + 1;
        const lowerLeft = upperLeft + rowSize;
        const lowerRight = lowerLeft + 1;
        indices.push(upperLeft, lowerLeft, upperRight, upperRight, lowerLeft, lowerRight);
      }
    }
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    indexCount = indices.length;
  }

  function fallbackEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 600;
    const context = canvas.getContext('2d');
    const ocean = context.createLinearGradient(0, 0, 0, canvas.height);
    ocean.addColorStop(0, '#1b4560');
    ocean.addColorStop(0.48, '#28637a');
    ocean.addColorStop(1, '#15394f');
    context.fillStyle = ocean;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const toPoint = ([latitude, longitude]) => [((longitude + 180) / 360) * canvas.width, ((90 - latitude) / 180) * canvas.height];
    const continents = [
      [[72,-166],[67,-145],[61,-132],[56,-126],[49,-124],[44,-117],[32,-114],[24,-106],[18,-100],[20,-88],[9,-82],[13,-76],[22,-80],[27,-79],[32,-75],[42,-68],[48,-54],[56,-58],[61,-65],[66,-61],[71,-82],[77,-96],[75,-116],[72,-137]],
      [[13,-81],[7,-77],[1,-78],[-7,-78],[-15,-74],[-22,-70],[-32,-72],[-45,-75],[-55,-68],[-52,-59],[-46,-54],[-37,-52],[-27,-49],[-18,-42],[-9,-36],[-3,-39],[3,-50],[6,-61],[10,-68],[12,-74]],
      [[70,-10],[66,-23],[61,-24],[57,-10],[51,-6],[48,3],[44,9],[42,17],[46,23],[52,31],[58,25],[63,30],[68,24],[71,12]],
      [[37,-10],[34,10],[31,30],[23,36],[13,50],[3,43],[-10,41],[-23,36],[-34,20],[-34,17],[-27,14],[-17,12],[-5,12],[5,-4],[13,-16],[22,-17],[30,-10]],
      [[71,28],[69,55],[64,76],[59,92],[57,111],[52,132],[47,145],[42,142],[39,128],[32,121],[25,121],[19,110],[11,106],[4,110],[-1,118],[-7,132],[-6,145],[0,153],[9,143],[18,130],[23,122],[31,121],[36,115],[42,113],[47,105],[51,91],[55,79],[59,67],[64,55],[68,43]],
      [[31,35],[27,44],[17,42],[8,48],[1,43],[-1,36],[7,31],[15,37],[22,39]],
      [[-11,112],[-17,116],[-23,114],[-29,116],[-35,121],[-39,133],[-36,145],[-29,153],[-22,150],[-16,145],[-12,132]],
      [[-10,130],[-15,136],[-10,141],[-5,139],[-4,132]],
      [[84,-55],[78,-42],[72,-24],[60,-42],[59,-53],[66,-60],[75,-61]],
      [[-70,-180],[-72,-120],[-70,-60],[-73,0],[-70,60],[-73,120],[-70,180],[-90,180],[-90,-180]]
    ];
    continents.forEach((polygon, index) => {
      context.beginPath();
      polygon.map(toPoint).forEach(([x, y], pointIndex) => pointIndex ? context.lineTo(x, y) : context.moveTo(x, y));
      context.closePath();
      context.fillStyle = index === continents.length - 1 ? '#e2e9e9' : '#78927b';
      context.fill();
      context.strokeStyle = 'rgba(196, 220, 199, 0.42)';
      context.lineWidth = 1.2;
      context.stroke();
    });
    return canvas;
  }

  function setTextureSource(source, label = 'NASA GIBS · Blue Marble relief texture') {
    if (!gl || !texture) return;
    const isBaseTexture = source === textureUrl;
    if (isBaseTexture || !textureLoaded) {
      if (isBaseTexture) textureLoaded = false;
      const fallback = fallbackEarthTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fallback);
      render();
    }
    const image = document.createElement('img');
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    imageRequest = image;
    image.onload = () => {
      if (imageRequest !== image) return;
      try {
        let textureImage = image;
        if (isBaseTexture) {
          baseEarthImage = image;
        } else if (baseEarthImage) {
          const composite = document.createElement('canvas');
          composite.width = baseEarthImage.naturalWidth || 2048;
          composite.height = baseEarthImage.naturalHeight || 1024;
          const context = composite.getContext('2d');
          context.drawImage(baseEarthImage, 0, 0, composite.width, composite.height);
          context.drawImage(image, 0, 0, composite.width, composite.height);
          textureImage = composite;
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
        gl.generateMipmap(gl.TEXTURE_2D);
        textureLoaded = true;
        setStatus(label, 'ready');
        render();
      } catch (error) {
        setStatus(`${label} unavailable · geographic relief fallback active`, 'error');
      }
    };
    image.onerror = () => {
      if (imageRequest !== image) return;
      if (!isBaseTexture && baseEarthImage) {
        try {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, baseEarthImage);
          gl.generateMipmap(gl.TEXTURE_2D);
          textureLoaded = true;
          render();
        } catch (error) {
          setStatus(`${label} unavailable · geographic relief fallback active`, 'error');
        }
      }
      setStatus(`${label} unavailable · geographic relief fallback active`, 'error');
    };
    image.src = source;
  }

  function drawSphere() {
    if (!gl || !program || !earthCanvas) return;
    const rect = host.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const pixelRatio = Math.min(1.5, window.devicePixelRatio || 1);
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));
    if (earthCanvas.width !== width || earthCanvas.height !== height) {
      earthCanvas.width = width;
      earthCanvas.height = height;
      overlayCanvas.width = width;
      overlayCanvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(0.006, 0.016, 0.035, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    const uvLocation = gl.getAttribLocation(program, 'aUv');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 20, 12);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation(program, 'uEarth'), 0);
    gl.uniform1f(gl.getUniformLocation(program, 'uHasTexture'), 1);
    gl.uniform1f(gl.getUniformLocation(program, 'uYaw'), yaw);
    gl.uniform1f(gl.getUniformLocation(program, 'uPitch'), pitch);
    gl.uniform1f(gl.getUniformLocation(program, 'uScale'), 0.9 * zoom);
    gl.uniform1f(gl.getUniformLocation(program, 'uAspect'), width / height);
    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
    drawOverlays(width, height, pixelRatio);
  }

  function rotateVector(vector) {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const x = cy * vector[0] + sy * vector[2];
    const y = vector[1];
    const z = -sy * vector[0] + cy * vector[2];
    return [x, cp * y - sp * z, sp * y + cp * z];
  }

  function geoVector(point) {
    const latitude = radians(point.lat);
    const longitude = radians(point.lng);
    return [Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude), Math.cos(latitude) * Math.cos(longitude)];
  }

  function projectVector(vector, width, height) {
    const rotated = rotateVector(vector);
    if (rotated[2] <= 0.015) return null;
    const radius = Math.min(width, height) * 0.45 * zoom;
    return { x: width / 2 + rotated[0] * radius, y: height / 2 - rotated[1] * radius, z: rotated[2], radius };
  }

  function project(point, width, height) {
    if (!point || !Number.isFinite(Number(point.lat)) || !Number.isFinite(Number(point.lng))) return null;
    return projectVector(geoVector(point), width, height);
  }

  function interpolateGreatCircle(start, end, amount) {
    const a = geoVector(start);
    const b = geoVector(end);
    const dot = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
    const angle = Math.acos(dot);
    if (angle < 0.00001) return a;
    const sinAngle = Math.sin(angle);
    const weightA = Math.sin((1 - amount) * angle) / sinAngle;
    const weightB = Math.sin(amount * angle) / sinAngle;
    return [a[0] * weightA + b[0] * weightB, a[1] * weightA + b[1] * weightB, a[2] * weightA + b[2] * weightB];
  }

  function drawGeoPath(context, points, width, height, options = {}) {
    if (!Array.isArray(points) || points.length < 2) return;
    context.save();
    context.strokeStyle = options.color || '#38bdf8';
    context.lineWidth = options.width || 2;
    context.globalAlpha = options.alpha ?? 0.92;
    context.setLineDash(options.dash || []);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowColor = options.color || '#38bdf8';
    context.shadowBlur = options.glow ? 9 : 0;
    context.beginPath();
    let drawing = false;
    for (let segment = 0; segment < points.length - 1; segment += 1) {
      const first = points[segment];
      const second = points[segment + 1];
      if (!first || !second) continue;
      const angle = Math.acos(clamp(geoVector(first).reduce((sum, value, index) => sum + value * geoVector(second)[index], 0), -1, 1));
      const steps = Math.max(3, Math.ceil(angle * 28));
      for (let step = 0; step <= steps; step += 1) {
        const vector = interpolateGreatCircle(first, second, step / steps);
        const point = projectVector(vector, width, height);
        if (!point) {
          drawing = false;
          continue;
        }
        if (!drawing) {
          context.moveTo(point.x, point.y);
          drawing = true;
        } else context.lineTo(point.x, point.y);
      }
    }
    context.stroke();
    context.restore();
  }

  function drawPolygon(context, points, width, height, options = {}) {
    if (!Array.isArray(points) || points.length < 3) return;
    const projected = points.map(point => project(point, width, height));
    if (projected.every(Boolean)) {
      context.save();
      context.beginPath();
      projected.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
      context.closePath();
      if (options.fill) {
        context.fillStyle = options.fill;
        context.fill();
      }
      context.strokeStyle = options.color || '#38bdf8';
      context.lineWidth = options.width || 1.5;
      context.setLineDash(options.dash || []);
      context.stroke();
      context.restore();
      return;
    }
    drawGeoPath(context, points.concat(points[0]), width, height, options);
  }

  function geoJsonLines(geometry, callback) {
    if (!geometry) return;
    if (geometry.type === 'LineString') callback(geometry.coordinates);
    else if (geometry.type === 'MultiLineString') geometry.coordinates.forEach(callback);
    else if (geometry.type === 'Polygon') geometry.coordinates.forEach(callback);
    else if (geometry.type === 'MultiPolygon') geometry.coordinates.forEach(polygon => polygon.forEach(callback));
  }

  function drawGeoJson(context, geojson, width, height, style = {}) {
    (geojson?.features || []).forEach(feature => {
      const geometry = feature.geometry;
      if (geometry?.type === 'Polygon' || geometry?.type === 'MultiPolygon') {
        const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
        polygons.forEach(rings => {
          const outerRing = rings?.[0]?.map(([lng, lat]) => ({ lat, lng })) || [];
          drawPolygon(context, outerRing, width, height, {
            ...style,
            fill: style.fill || 'rgba(34,211,238,0.075)'
          });
          rings?.slice(1).forEach(ring => drawGeoPath(context, ring.map(([lng, lat]) => ({ lat, lng })), width, height, style));
        });
        return;
      }
      geoJsonLines(feature.geometry, coordinates => {
        const points = coordinates.map(([lng, lat]) => ({ lat, lng }));
        drawGeoPath(context, points, width, height, style);
      });
    });
  }

  function drawCircle(context, center, radiusKm, width, height, color, fill) {
    if (!center || !Number.isFinite(radiusKm) || radiusKm <= 0) return;
    const earthRadiusKm = 6371;
    const angular = radiusKm / earthRadiusKm;
    const latitude = radians(center.lat);
    const longitude = radians(center.lng);
    const points = [];
    for (let bearing = 0; bearing <= 360; bearing += 5) {
      const bearingRad = radians(bearing);
      const nextLatitude = Math.asin(Math.sin(latitude) * Math.cos(angular) + Math.cos(latitude) * Math.sin(angular) * Math.cos(bearingRad));
      const nextLongitude = longitude + Math.atan2(Math.sin(bearingRad) * Math.sin(angular) * Math.cos(latitude), Math.cos(angular) - Math.sin(latitude) * Math.sin(nextLatitude));
      points.push({ lat: nextLatitude * 180 / Math.PI, lng: nextLongitude * 180 / Math.PI });
    }
    drawPolygon(context, points, width, height, { color, fill, width: 1.5, dash: [4, 5] });
  }

  function drawForecastPoints(context, points, selectedHour, width, height) {
    const nearest = (points || []).reduce((best, point) => {
      const distance = Math.abs(Number(point.hour) - Number(selectedHour));
      return !best || distance < best.distance ? { point, distance } : best;
    }, null)?.point;
    (points || []).forEach(point => {
      const projected = project(point, width, height);
      if (!projected) return;
      const selected = point === nearest;
      context.save();
      context.beginPath();
      context.arc(projected.x, projected.y, selected ? 5 : 3.2, 0, Math.PI * 2);
      context.fillStyle = selected ? '#67e8f9' : 'rgba(226,232,240,0.9)';
      context.fill();
      context.strokeStyle = '#0b1725';
      context.lineWidth = selected ? 1.8 : 1.2;
      context.stroke();
      context.restore();
    });
  }

  function drawWeatherCell(context, cell, width, height) {
    const latRadius = Number(cell.latRadius) || 0.5;
    const lngRadius = Number(cell.lngRadius) || 0.5;
    const corners = [
      { lat: cell.lat - latRadius, lng: cell.lng - lngRadius },
      { lat: cell.lat + latRadius, lng: cell.lng - lngRadius },
      { lat: cell.lat + latRadius, lng: cell.lng + lngRadius },
      { lat: cell.lat - latRadius, lng: cell.lng + lngRadius }
    ];
    const projected = corners.map(point => project(point, width, height));
    if (!projected.every(Boolean)) return;
    context.save();
    context.beginPath();
    projected.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
    context.closePath();
    context.globalAlpha = 0.32;
    context.fillStyle = cell.color;
    context.fill();
    context.restore();
  }

  function drawForecastPosition(context, point, width, height) {
    const projected = project(point, width, height);
    if (!projected) return;
    context.save();
    context.beginPath();
    context.arc(projected.x, projected.y, 9, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(103,232,249,0.94)';
    context.lineWidth = 2;
    context.setLineDash([3, 3]);
    context.stroke();
    context.restore();
  }

  function drawLabel(context, x, y, text, color, selected, width, bounds) {
    context.save();
    context.font = selected ? '700 12px system-ui, sans-serif' : '600 11px system-ui, sans-serif';
    const safeLeft = clamp(Number(bounds?.left) || 8, 8, width - 24);
    const safeRight = clamp(Number(bounds?.right) || width - 8, safeLeft + 80, width - 8);
    const labelWidth = Math.min(context.measureText(text).width + 14, safeRight - safeLeft);
    const labelX = clamp(x + 13, safeLeft, safeRight - labelWidth);
    const labelY = clamp(y - 11, 18, context.canvas.height - 18);
    context.fillStyle = selected ? 'rgba(6, 18, 31, 0.94)' : 'rgba(6, 15, 27, 0.82)';
    context.strokeStyle = selected ? 'rgba(103, 232, 249, 0.65)' : 'rgba(148, 163, 184, 0.38)';
    context.lineWidth = 1;
    context.beginPath();
    context.roundRect(labelX, labelY - 10, labelWidth, 22, 5);
    context.fill();
    context.stroke();
    context.fillStyle = color || '#f8fafc';
    context.textBaseline = 'middle';
    context.fillText(text, labelX + 7, labelY + 1, labelWidth - 14);
    context.restore();
  }

  function drawMarker(context, storm, width, height, selected = false, kind = 'live') {
    const point = project(storm, width, height);
    if (!point) return;
    const color = storm.color || (selected ? '#fb7185' : '#38bdf8');
    const radius = selected ? 7 : 5.5;
    context.save();
    context.globalAlpha = 0.92;
    context.shadowColor = color;
    context.shadowBlur = selected ? 18 : 10;
    context.beginPath();
    context.arc(point.x, point.y, radius + (selected ? 5 : 2), 0, Math.PI * 2);
    context.strokeStyle = selected ? 'rgba(103, 232, 249, 0.88)' : 'rgba(255,255,255,0.78)';
    context.lineWidth = selected ? 1.8 : 1.3;
    context.stroke();
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.strokeStyle = '#fff';
    context.lineWidth = selected ? 2 : 1.5;
    context.stroke();
    context.restore();
    const wind = Number.isFinite(storm.windKmh) ? `${Math.round(storm.windKmh)} km/h` : '';
    const category = String(storm.category || '');
    const shortCategory = category.length > 16 ? category.split(/\s+/).slice(0, 2).join(' ') : category;
    const label = [storm.name, wind, shortCategory].filter(Boolean).join(' · ');
    drawLabel(context, point.x, point.y - 12, label, '#f8fafc', selected, width, state.labelBounds);
    hitTargets.push({ x: point.x, y: point.y, radius: selected ? 20 : 16, name: storm.name, basin: storm.basin, kind });
  }

  function drawOverlays(width, height, pixelRatio) {
    if (!overlayCanvas) return;
    const context = overlayCanvas.getContext('2d');
    if (!context) return;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const cssWidth = width / pixelRatio;
    const cssHeight = height / pixelRatio;
    hitTargets = [];
    const layers = state.layers || {};

    if (state.scenario) {
      const scenario = state.scenario;
      if (layers.cone && scenario.cone95) drawPolygon(context, scenario.cone95, cssWidth, cssHeight, { color: 'rgba(56,189,248,0.8)', fill: 'rgba(34,211,238,0.065)', width: 1.5, dash: [4, 6] });
      if (layers.cone && scenario.cone68) drawPolygon(context, scenario.cone68, cssWidth, cssHeight, { color: 'rgba(103,232,249,0.85)', fill: 'rgba(34,211,238,0.085)', width: 1.7 });
      if (layers.pastTrack) drawGeoPath(context, scenario.pastTrack || [], cssWidth, cssHeight, { color: '#cbd5e1', width: 2.2, alpha: 0.75, dash: [3, 5] });
      if (layers.forecastTrack) drawGeoPath(context, scenario.forecastTrack || [], cssWidth, cssHeight, { color: '#22d3ee', width: 2.6, alpha: 0.96, dash: [7, 5], glow: true });
      if (layers.ensemble) (scenario.ensembles || []).forEach(line => drawGeoPath(context, line.coords, cssWidth, cssHeight, { color: line.color, width: 1.1, alpha: 0.42, dash: [2, 6] }));
      if (layers.waypoints) {
        (scenario.forecastTrack || []).forEach(point => {
          const projected = project(point, cssWidth, cssHeight);
          if (!projected) return;
          context.beginPath();
          context.arc(projected.x, projected.y, point.hour === state.forecastHour ? 5 : 3, 0, Math.PI * 2);
          context.fillStyle = point.hour === state.forecastHour ? '#67e8f9' : 'rgba(226,232,240,0.9)';
          context.fill();
          context.strokeStyle = '#0b1725';
          context.lineWidth = 1.2;
          context.stroke();
        });
      }
      if (layers.radii) {
        drawCircle(context, scenario.position, scenario.r34Km, cssWidth, cssHeight, 'rgba(251,191,36,0.8)', 'rgba(251,146,60,0.025)');
        drawCircle(context, scenario.position, scenario.r50Km, cssWidth, cssHeight, 'rgba(251,146,60,0.8)', 'rgba(251,146,60,0.035)');
        drawCircle(context, scenario.position, scenario.r64Km, cssWidth, cssHeight, 'rgba(251,113,133,0.88)', 'rgba(244,63,94,0.04)');
      }
      if (layers.explainability) drawCircle(context, scenario.position, scenario.explainabilityRadiusKm, cssWidth, cssHeight, 'rgba(167,139,250,0.84)', 'rgba(139,92,246,0.07)');
      if (layers.impactZone) drawCircle(context, scenario.position, scenario.r34Km, cssWidth, cssHeight, 'rgba(251,146,60,0.85)', 'rgba(249,115,22,0.06)');
      if (layers.detection) {
        const halfLat = scenario.detectionHalfLat || 0.34;
        const halfLng = scenario.detectionHalfLng || 0.48;
        drawPolygon(context, [
          { lat: scenario.position.lat - halfLat, lng: scenario.position.lng - halfLng },
          { lat: scenario.position.lat + halfLat, lng: scenario.position.lng - halfLng },
          { lat: scenario.position.lat + halfLat, lng: scenario.position.lng + halfLng },
          { lat: scenario.position.lat - halfLat, lng: scenario.position.lng + halfLng }
        ], cssWidth, cssHeight, { color: '#67e8f9', fill: 'rgba(34,211,238,0.035)', width: 2, dash: [5, 4] });
      }
      if (scenario.forecastPosition) {
        const forecastPoint = project(scenario.forecastPosition, cssWidth, cssHeight);
        if (forecastPoint) {
          context.beginPath();
          context.arc(forecastPoint.x, forecastPoint.y, 9, 0, Math.PI * 2);
          context.strokeStyle = 'rgba(103,232,249,0.8)';
          context.lineWidth = 1.6;
          context.stroke();
        }
      }
    } else if (state.liveTracks) {
      if (layers.pastTrack) drawGeoJson(context, state.liveTracks.past, cssWidth, cssHeight, { color: '#cbd5e1', width: 2.2, alpha: 0.78, dash: [3, 5] });
      if (layers.forecastTrack) drawGeoJson(context, state.liveTracks.forecast, cssWidth, cssHeight, { color: '#22d3ee', width: 2.6, alpha: 0.95, dash: [7, 5], glow: true });
      if (layers.cone) drawGeoJson(context, state.liveTracks.cone, cssWidth, cssHeight, { color: 'rgba(56,189,248,0.9)', fill: 'rgba(34,211,238,0.075)', width: 1.6, alpha: 0.9, dash: [4, 5] });
      if (layers.waypoints) drawForecastPoints(context, state.liveTracks.forecastPoints, state.forecastHour, cssWidth, cssHeight);
      if (state.liveTracks.forecastPosition) drawForecastPosition(context, state.liveTracks.forecastPosition, cssWidth, cssHeight);
    }

    (state.weatherCells || []).forEach(cell => drawWeatherCell(context, cell, cssWidth, cssHeight));

    state.storms.forEach(storm => {
      const selected = state.selectedStorm?.kind === 'live' && state.selectedStorm.name === storm.name && state.selectedStorm.basin === storm.basin;
      if (selected) return;
      drawMarker(context, { ...storm, windKmh: storm.maxWind == null ? null : Number(storm.maxWind) * 1.60934, color: storm.color || '#fbbf24' }, cssWidth, cssHeight, false, 'live');
    });
    if (state.selectedStorm) drawMarker(context, state.selectedStorm, cssWidth, cssHeight, true, state.selectedStorm.kind || 'scenario');
  }

  function render() {
    if (!supported || animationFrame) return;
    animationFrame = requestAnimationFrame(() => {
      animationFrame = 0;
      if (targetYaw !== null && targetPitch !== null) {
        const yawDelta = targetYaw - yaw;
        yaw += yawDelta * (reducedMotion() ? 1 : 0.16);
        pitch += (targetPitch - pitch) * (reducedMotion() ? 1 : 0.16);
        if (Math.abs(yawDelta) < 0.001 && Math.abs(targetPitch - pitch) < 0.001) {
          yaw = targetYaw;
          pitch = targetPitch;
          targetYaw = null;
          targetPitch = null;
        }
      }
      drawSphere();
      if (targetYaw !== null) render();
    });
  }

  function focus(latitude, longitude) {
    if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) return;
    targetYaw = -radians(Number(longitude));
    targetPitch = clamp(radians(Number(latitude)), radians(-75), radians(75));
    if (reducedMotion()) {
      yaw = targetYaw;
      pitch = targetPitch;
      targetYaw = null;
      targetPitch = null;
    }
    render();
  }

  function focusSelected() {
    const selected = state.selectedStorm;
    if (selected) focus(selected.lat, selected.lng);
  }

  function resetView() {
    targetYaw = 0;
    targetPitch = 0;
    zoom = 1;
    if (reducedMotion()) {
      yaw = 0;
      pitch = 0;
      targetYaw = null;
      targetPitch = null;
    }
    render();
  }

  function resize() {
    render();
  }

  function vectorToGeographic(vector) {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const unpitched = [vector[0], cp * vector[1] + sp * vector[2], -sp * vector[1] + cp * vector[2]];
    const unturned = [cy * unpitched[0] - sy * unpitched[2], unpitched[1], sy * unpitched[0] + cy * unpitched[2]];
    return { lat: Math.asin(clamp(unturned[1], -1, 1)) * 180 / Math.PI, lng: Math.atan2(unturned[0], unturned[2]) * 180 / Math.PI };
  }

  function mapPointerToGeo(event) {
    const rect = overlayCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.min(rect.width, rect.height) * 0.45 * zoom;
    if (radius <= 0) return null;
    const nx = (x - rect.width / 2) / radius;
    const ny = (rect.height / 2 - y) / radius;
    const distance = nx * nx + ny * ny;
    if (distance > 1) return null;
    const geographic = vectorToGeographic([nx, ny, Math.sqrt(1 - distance)]);
    return { ...geographic, screenX: x, screenY: y };
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY, yaw, pitch, moved: false };
    overlayCanvas.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!pointerStart) {
      const location = mapPointerToGeo(event);
      if (location) handlers.coordinates?.(location);
      return;
    }
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) pointerStart.moved = true;
    if (pointerStart.moved) {
      yaw = pointerStart.yaw + dx * 0.008;
      pitch = clamp(pointerStart.pitch + dy * 0.008, radians(-82), radians(82));
      targetYaw = null;
      targetPitch = null;
      render();
    }
  }

  function onPointerUp(event) {
    if (!pointerStart) return;
    const moved = pointerStart.moved;
    pointerStart = null;
    if (moved) return;
    const location = mapPointerToGeo(event);
    if (!location) return;
    handlers.coordinates?.(location);
    const closest = hitTargets.reduce((best, candidate) => {
      const distance = Math.hypot(candidate.x - location.screenX, candidate.y - location.screenY);
      return distance < candidate.radius && (!best || distance < best.distance) ? { ...candidate, distance } : best;
    }, null);
    if (closest) {
      if (closest.kind === 'live') handlers.selectStorm?.({ name: closest.name, basin: closest.basin });
      else focusSelected();
      return;
    }
    handlers.mapClick?.(location);
  }

  function onWheel(event) {
    event.preventDefault();
    zoom = clamp(zoom * (event.deltaY < 0 ? 1.12 : 1 / 1.12), 0.75, 2.4);
    render();
  }

  function onKeyDown(event) {
    const step = event.shiftKey ? 0.24 : 0.12;
    if (event.key === 'ArrowLeft') yaw -= step;
    else if (event.key === 'ArrowRight') yaw += step;
    else if (event.key === 'ArrowUp') pitch = clamp(pitch - step, radians(-82), radians(82));
    else if (event.key === 'ArrowDown') pitch = clamp(pitch + step, radians(-82), radians(82));
    else if (event.key === '+' || event.key === '=') zoom = clamp(zoom * 1.12, 0.75, 2.4);
    else if (event.key === '-') zoom = clamp(zoom / 1.12, 0.75, 2.4);
    else if (event.key === 'Home') {
      resetView();
      event.preventDefault();
      return;
    } else return;
    targetYaw = null;
    targetPitch = null;
    event.preventDefault();
    render();
  }

  function initialize(options = {}) {
    host = options.host;
    earthCanvas = options.canvas;
    overlayCanvas = options.overlay;
    statusElement = options.status;
    handlers.selectStorm = options.onSelectStorm;
    handlers.mapClick = options.onMapClick;
    handlers.coordinates = options.onCoordinates;
    handlers.failure = options.onFailure;
    if (!host || !earthCanvas || !overlayCanvas) return false;
    gl = earthCanvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'low-power' }) || earthCanvas.getContext('experimental-webgl');
    if (!gl) {
      setStatus('3D graphics are unavailable in this browser · 2D map remains active', 'error');
      return false;
    }
    try {
      program = createProgram();
      buildSphere();
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const placeholder = new Uint8Array([16, 48, 68, 255]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, placeholder);
      supported = true;
      setStatus('Loading NASA GIBS · Blue Marble relief texture', 'loading');
      setTextureSource(textureUrl, 'NASA GIBS · Blue Marble relief texture');
      overlayCanvas.addEventListener('pointerdown', onPointerDown);
      overlayCanvas.addEventListener('pointermove', onPointerMove);
      overlayCanvas.addEventListener('pointerup', onPointerUp);
      overlayCanvas.addEventListener('pointercancel', () => { pointerStart = null; });
      overlayCanvas.addEventListener('wheel', onWheel, { passive: false });
      host.addEventListener('keydown', onKeyDown);
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      window.addEventListener('resize', resize, { passive: true });
      render();
      return true;
    } catch (error) {
      supported = false;
      setStatus(`3D Earth could not start · ${error.message}`, 'error');
      handlers.failure?.(error);
      return false;
    }
  }

  function update(nextState = {}) {
    Object.assign(state, nextState);
    render();
  }

  function setVisible(visible) {
    if (visible) requestAnimationFrame(() => { resize(); render(); });
  }

  function zoomBy(factor) {
    zoom = clamp(zoom * factor, 0.75, 2.4);
    render();
  }

  window.VayuEarthGlobe = {
    init: initialize,
    update,
    setVisible,
    setTextureSource: (source = textureUrl, label = 'NASA GIBS · Blue Marble relief texture') => {
      if (!supported) return;
      setStatus(`Loading ${label}`, 'loading');
      setTextureSource(source || textureUrl, label);
    },
    focus,
    focusSelected,
    resetView,
    zoomBy,
    isSupported: () => supported
  };
})();
