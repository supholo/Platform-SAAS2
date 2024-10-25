import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CICDConfig from './pages/CICDConfig';
import LoggingService from './pages/LoggingService';
import MetricsSystem from './pages/MetricsSystem';
import IdentityManagement from './pages/IdentityManagement';
import RoleManagement from './pages/RoleManagement';
import PageBuilder from './pages/PageBuilder';
import AuditLog from './pages/AuditLog';
import NotificationSettings from './pages/NotificationSettings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cicd" element={<CICDConfig />} />
          <Route path="/logging" element={<LoggingService />} />
          <Route path="/metrics" element={<MetricsSystem />} />
          <Route path="/identity" element={<IdentityManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/page-builder" element={<PageBuilder />} />
          <Route path="/audit-log" element={<AuditLog />} />
          <Route path="/notifications" element={<NotificationSettings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;