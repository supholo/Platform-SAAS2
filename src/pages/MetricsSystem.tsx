import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MetricsSystem: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('cpu');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  // Simulated data for demonstration purposes
  const generateData = (metric: string, timeRange: string) => {
    const points = timeRange === '1h' ? 60 : timeRange === '24h' ? 24 : 7;
    return Array.from({ length: points }, (_, i) => ({
      x: i,
      y: Math.random() * 100,
    }));
  };

  const data = {
    datasets: [
      {
        label: selectedMetric.toUpperCase() + ' Usage',
        data: generateData(selectedMetric, selectedTimeRange),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedMetric.toUpperCase()} Usage Over Time`,
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: selectedTimeRange === '1h' ? 'Minutes' : selectedTimeRange === '24h' ? 'Hours' : 'Days',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Usage (%)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Metrics System</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <label htmlFor="metric-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Metric
              </label>
              <select
                id="metric-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="cpu">CPU</option>
                <option value="memory">Memory</option>
                <option value="disk">Disk</option>
                <option value="network">Network</option>
              </select>
            </div>
            <div className="mt-4 sm:mt-0">
              <label htmlFor="time-range-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Range
              </label>
              <select
                id="time-range-select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">APM Integration</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
            <p>Configure your Application Performance Management (APM) tool integration here.</p>
          </div>
          <form className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="apm-api-key" className="sr-only">
                APM API Key
              </label>
              <input
                type="text"
                name="apm-api-key"
                id="apm-api-key"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter APM API Key"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Connect APM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetricsSystem;