import React, { useState } from 'react';
import { Search, Eye, EyeOff } from 'lucide-react';

interface Log {
  id: number;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
  component: string;
  message: string;
}

const LoggingService: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, timestamp: '2023-03-15 10:30:00', severity: 'info', component: 'Auth', message: 'User logged in successfully' },
    { id: 2, timestamp: '2023-03-15 10:35:00', severity: 'warning', component: 'Database', message: 'High CPU usage detected' },
    { id: 3, timestamp: '2023-03-15 10:40:00', severity: 'error', component: 'API', message: 'Failed to process request: Invalid token' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string[]>([]);
  const [maskSensitiveData, setMaskSensitiveData] = useState(true);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [event.target.name]: event.target.value });
  };

  const handleSeverityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const severity = event.target.value;
    setSelectedSeverity(
      event.target.checked
        ? [...selectedSeverity, severity]
        : selectedSeverity.filter((s) => s !== severity)
    );
  };

  const handleComponentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const component = event.target.value;
    setSelectedComponent(
      event.target.checked
        ? [...selectedComponent, component]
        : selectedComponent.filter((c) => c !== component)
    );
  };

  const toggleMaskSensitiveData = () => {
    setMaskSensitiveData(!maskSensitiveData);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity.length === 0 || selectedSeverity.includes(log.severity);
    const matchesComponent = selectedComponent.length === 0 || selectedComponent.includes(log.component);
    const matchesDateRange =
      (!dateRange.start || log.timestamp >= dateRange.start) &&
      (!dateRange.end || log.timestamp <= dateRange.end);

    return matchesSearch && matchesSeverity && matchesComponent && matchesDateRange;
  });

  const maskSensitiveInfo = (message: string) => {
    // This is a simple example. In a real application, you'd use more sophisticated
    // techniques to identify and mask sensitive data.
    return message.replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, 'XXXX-XXXX-XXXX-XXXX');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Logging Service</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-grow max-w-lg">
              <label htmlFor="search" className="sr-only">
                Search logs
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Search logs"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                type="button"
                onClick={toggleMaskSensitiveData}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {maskSensitiveData ? (
                  <>
                    <EyeOff className="mr-2 h-5 w-5" aria-hidden="true" />
                    Mask Sensitive Data
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-5 w-5" aria-hidden="true" />
                    Show Sensitive Data
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-8">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                name="start"
                id="start-date"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={dateRange.start}
                onChange={handleDateRangeChange}
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <input
                type="date"
                name="end"
                id="end-date"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={dateRange.end}
                onChange={handleDateRangeChange}
              />
            </div>
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300">Severity</legend>
                <div className="mt-2 space-y-2">
                  {['info', 'warning', 'error'].map((severity) => (
                    <div key={severity} className="flex items-center">
                      <input
                        id={severity}
                        name="severity"
                        type="checkbox"
                        value={severity}
                        checked={selectedSeverity.includes(severity)}
                        onChange={handleSeverityChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label htmlFor={severity} className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        {severity.charAt(0).toUpperCase() + severity.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Log Entries</h3>
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Severity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Component
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredLogs.map((log) => (
                          <tr key={log.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {log.timestamp}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                log.severity === 'info'
                                  ? 'bg-green-100 text-green-800'
                                  : log.severity === 'warning'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {log.severity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {log.component}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {maskSensitiveData ? maskSensitiveInfo(log.message) : log.message}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggingService;