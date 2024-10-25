import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  settings: {
    email?: string;
    phone?: string;
    slack?: string;
  };
}

const NotificationSettings: React.FC = () => {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'email',
      name: 'Email Notifications',
      icon: <Mail className="h-6 w-6" />,
      enabled: true,
      settings: {
        email: 'user@example.com'
      }
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      icon: <Smartphone className="h-6 w-6" />,
      enabled: false,
      settings: {
        phone: '+1234567890'
      }
    },
    {
      id: 'slack',
      name: 'Slack Notifications',
      icon: <MessageSquare className="h-6 w-6" />,
      enabled: true,
      settings: {
        slack: 'workspace-name'
      }
    }
  ]);

  const [notificationTypes] = useState([
    { id: 'security', name: 'Security Alerts', enabled: true },
    { id: 'updates', name: 'System Updates', enabled: true },
    { id: 'maintenance', name: 'Maintenance Notifications', enabled: false },
    { id: 'performance', name: 'Performance Alerts', enabled: true }
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const updateChannelSettings = (channelId: string, field: string, value: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, settings: { ...channel.settings, [field]: value } }
        : channel
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Notification Settings</h1>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Notification Channels
          </h3>
          <div className="mt-6 space-y-6">
            {channels.map((channel) => (
              <div key={channel.id} className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                        {channel.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {channel.name}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => toggleChannel(channel.id)}
                      className={`${
                        channel.enabled
                          ? 'bg-indigo-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      <span className="sr-only">Enable {channel.name}</span>
                      <span
                        className={`${
                          channel.enabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>
                </div>
                {channel.enabled && (
                  <div className="ml-16 space-y-4">
                    {channel.id === 'email' && (
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={channel.settings.email}
                          onChange={(e) => updateChannelSettings(channel.id, 'email', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    )}
                    {channel.id === 'sms' && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={channel.settings.phone}
                          onChange={(e) => updateChannelSettings(channel.id, 'phone', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    )}
                    {channel.id === 'slack' && (
                      <div>
                        <label htmlFor="slack" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Slack Workspace
                        </label>
                        <input
                          type="text"
                          id="slack"
                          value={channel.settings.slack}
                          onChange={(e) => updateChannelSettings(channel.id, 'slack', e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Notification Types
          </h3>
          <div className="mt-6 space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {type.name}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${
                      type.enabled
                        ? 'bg-indigo-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span className="sr-only">Enable {type.name}</span>
                    <span
                      className={`${
                        type.enabled ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;