import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, GitBranch, Search, Shield, Users, Layout as LayoutIcon, FileText, Bell } from 'lucide-react';

const DashboardCard: React.FC<{ title: string; description: string; icon: React.ReactNode; link: string }> = ({ title, description, icon, link }) => (
  <Link to={link} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900 dark:text-white">{description}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="CI/CD Configuration"
          description="Manage your pipelines"
          icon={<GitBranch className="h-6 w-6 text-white" />}
          link="/cicd"
        />
        <DashboardCard
          title="Logging Service"
          description="Search and manage logs"
          icon={<Search className="h-6 w-6 text-white" />}
          link="/logging"
        />
        <DashboardCard
          title="Metrics System"
          description="Monitor performance"
          icon={<Activity className="h-6 w-6 text-white" />}
          link="/metrics"
        />
        <DashboardCard
          title="Identity Management"
          description="Manage authentication"
          icon={<Shield className="h-6 w-6 text-white" />}
          link="/identity"
        />
        <DashboardCard
          title="Role Management"
          description="Manage user roles"
          icon={<Users className="h-6 w-6 text-white" />}
          link="/roles"
        />
        <DashboardCard
          title="Page Builder"
          description="Create custom pages"
          icon={<LayoutIcon className="h-6 w-6 text-white" />}
          link="/page-builder"
        />
        <DashboardCard
          title="Audit Log"
          description="Track user activities"
          icon={<FileText className="h-6 w-6 text-white" />}
          link="/audit-log"
        />
        <DashboardCard
          title="Notification Settings"
          description="Manage notifications"
          icon={<Bell className="h-6 w-6 text-white" />}
          link="/notifications"
        />
      </div>
    </div>
  );
};

export default Dashboard;