const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Let's create build_app_and_styles.js
const stylesToAdd = `
/* ==========================================================================
   VayuDrishti - Upgraded Dashboard & Application Layout Styling
   ========================================================================== */

.app-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--bg-primary);
}

/* TOP NAVIGATION BAR */
.top-nav-bar {
  height: 52px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  z-index: 1000;
  flex-shrink: 0;
  gap: 1rem;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.top-brand-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #ffffff;
  line-height: 1.1;
}

.top-brand-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.top-nav-center {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  padding: 0 0.5rem;
}

.nav-tab {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 500;
  padding: 0.45rem 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.nav-tab.active {
  background: rgba(0, 242, 254, 0.12);
  color: var(--accent-cyan);
  border-bottom: 2px solid var(--accent-cyan);
  font-weight: 600;
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.top-scenario-select {
  background: #0d162a;
  color: var(--accent-cyan);
  border: 1px solid #1e2d4a;
  border-radius: 4px;
  padding: 0.35rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

.top-sim-badge {
  background: rgba(244, 63, 94, 0.15);
  color: var(--alert-red);
  border: 1px solid rgba(244, 63, 94, 0.35);
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  white-space: nowrap;
}

.top-updated-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  white-space: nowrap;
}

/* PAGES CONTAINER */
.pages-viewport {
  flex: 1;
  overflow-y: auto;
  position: relative;
  background: var(--bg-primary);
}

.page-view {
  display: none;
  min-height: 100%;
}

.page-view.active {
  display: flex;
  flex-direction: column;
}

/* ==========================================================================
   DASHBOARD WORKSPACE STYLING
   ========================================================================== */

.dash-container {
  padding: 0.85rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-width: 1720px;
  margin: 0 auto;
  width: 100%;
}

/* SECTION 1: COMPACT STATUS STRIP */
.dash-status-strip {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  padding: 0.55rem 1.15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.status-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.status-cell-lbl {
  font-size: 0.65rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.status-cell-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
}

.status-cell-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: normal;
}

.status-cell-divider {
  width: 1px;
  height: 28px;
  background: var(--border-subtle);
}

.status-risk-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
}

.status-risk-pill.high {
  background: rgba(239, 68, 68, 0.18);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.45);
}

.status-risk-pill.mod {
  background: rgba(234, 179, 8, 0.18);
  color: #eab308;
  border: 1px solid rgba(234, 179, 8, 0.45);
}

/* SECTION 2 & 3 & 4: MAIN GRID (MAP 60% + RIGHT STACK 40%) */
.dash-main-grid {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 0.85rem;
}

@media (max-width: 1100px) {
  .dash-main-grid {
    grid-template-columns: 1fr;
  }
}

.dash-map-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border-subtle);
}

.card-header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #ffffff;
}

.card-header-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-meta-sub {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.header-live-badge {
  font-size: 0.7rem;
  color: var(--alert-green);
  font-weight: 600;
  letter-spacing: 0.5px;
}

.badge-tag-danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--alert-red);
  border: 1px solid rgba(239, 68, 68, 0.35);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.dash-map-wrapper {
  position: relative;
  height: 480px;
  width: 100%;
  background: #020617;
}

#cycloneMap {
  width: 100%;
  height: 100%;
}

.dash-right-stack {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.dash-panel-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dash-rc-content, .dash-fc-content, .dash-risk-content, .dash-pri-content {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dash-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.dash-metric-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 0.55rem 0.65rem;
}

.dm-lbl {
  font-size: 0.66rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dm-val {
  font-size: 0.95rem;
  font-weight: 700;
}

.dash-card-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: flex-end;
}

.dash-view-link {
  background: transparent;
  border: none;
  color: var(--accent-cyan);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.45rem;
  border-radius: 3px;
  transition: all 0.15s ease;
}

.dash-view-link:hover {
  background: rgba(0, 242, 254, 0.1);
  text-decoration: underline;
}

/* 72H SUMMARY TABLE */
.dash-summary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.76rem;
}

.dash-summary-table th {
  text-align: left;
  padding: 4px 6px;
  color: var(--text-muted);
  font-size: 0.65rem;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-subtle);
}

.dash-summary-table td {
  padding: 5px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.tag-lf {
  background: rgba(239, 68, 68, 0.2);
  color: var(--alert-red);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.62rem;
  font-weight: bold;
}

.dash-sparkline-box {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 6px 10px;
}

.sparkline-title-row {
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.dash-sparkline-svg {
  width: 100%;
  height: 28px;
}

/* LOWER DECK: 50% / 50% GRID */
.dash-lower-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

@media (max-width: 1024px) {
  .dash-lower-grid {
    grid-template-columns: 1fr;
  }
}

.dash-rf-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

@media (max-width: 600px) {
  .dash-rf-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.dash-rf-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rf-title {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.rf-state {
  font-size: 0.95rem;
  font-weight: 700;
}

.rf-desc {
  font-size: 0.68rem;
  color: var(--text-secondary);
}

.dash-why-box {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  padding: 0.65rem 0.85rem;
}

.why-box-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}

.why-box-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.why-box-row {
  font-size: 0.76rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.why-icon {
  font-weight: 700;
  font-size: 0.85rem;
}

/* PRIORITY ATTENTION LIST */
.dash-pri-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.dash-pri-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
}

.pri-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.pri-marker {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pri-marker.high {
  background: var(--alert-red);
  box-shadow: 0 0 6px var(--alert-red);
}

.pri-marker.mod {
  background: var(--alert-yellow);
  box-shadow: 0 0 6px var(--alert-yellow);
}

.pri-sub {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* SECTION 7: DATA STATUS FOOTER */
.dash-data-bar {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  padding: 0.45rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.dd-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dd-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.6px;
}

.dd-sensors {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.74rem;
  color: var(--text-secondary);
}

.dd-sensor {
  display: flex;
  align-items: center;
  gap: 5px;
}

.dot-live {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--alert-green);
  box-shadow: 0 0 5px var(--alert-green);
  display: inline-block;
}

.dd-sep {
  color: var(--text-dim);
}

.dd-status-text {
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

/* SUBPAGE WORKSPACES (TRACKING, SATELLITE, RI, FORECAST, RISK, SIMULATION, ADVISORY) */
.page-header-strip {
  padding: 1rem 1.5rem;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header-strip h2 {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
}

.page-header-strip p {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
}

.page-body-grid {
  display: grid;
  grid-template-columns: 1fr 390px;
  gap: 1.25rem;
  padding: 1.25rem;
  flex: 1;
}

@media (max-width: 1024px) {
  .page-body-grid {
    grid-template-columns: 1fr;
  }
}

.body-col-main {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.body-col-sidebar {
  display: flex;
  flex-direction: column;
}

.subpage-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  padding: 1.25rem;
}

.subpage-card h3 {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.45rem;
  margin-bottom: 0.75rem;
}

.param-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.param-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.param-grid-2 label, .param-grid-3 label {
  font-size: 0.66rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.param-grid-2 div, .param-grid-3 div {
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 2px;
}
`;

fs.appendFileSync(path.join(rootDir, 'styles.css'), '\n' + stylesToAdd, 'utf8');
console.log('Successfully appended styles to styles.css');
