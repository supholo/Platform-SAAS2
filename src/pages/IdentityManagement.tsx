import React, { useState } from 'react';
import { Shield, User, Key } from 'lucide-react';

const IdentityManagement: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('internal');
  const [oauthConfig, setOauthConfig] = useState({
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    tokenUrl: '',
  });
  const [samlConfig, setSamlConfig] = useState({
    entityId: '',
    assertionConsumerServiceUrl: '',
    singleSignOnServiceUrl: '',
    x509Certificate: '',
  });

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
  };

  const handleOAuthConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOauthConfig({
      ...oauthConfig,
      [event.target.name]: event.target.value,
    });
  };

  const handleSAMLConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSamlConfig({
      ...samlConfig,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Identity Management</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Identity Provider Configuration</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
            <p>Choose and configure your identity provider.</p>
          </div>
          <div className="mt-5">
            <label htmlFor="provider-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Provider
            </label>
            <select
              id="provider-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={selectedProvider}
              onChange={handleProviderChange}
            >
              <option value="internal">Internal (IdentityServer4)</option>
              <option value="oauth2">OAuth 2.0</option>
              <option value="saml">SAML</option>
            </select>
          </div>
          {selectedProvider === 'oauth2' && (
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Client ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="clientId"
                    id="clientId"
                    value={oauthConfig.clientId}
                    onChange={handleOAuthConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Client Secret
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="clientSecret"
                    id="clientSecret"
                    value={oauthConfig.clientSecret}
                    onChange={handleOAuthConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="authorizationUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Authorization URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="authorizationUrl"
                    id="authorizationUrl"
                    value={oauthConfig.authorizationUrl}
                    onChange={handleOAuthConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="tokenUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Token URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tokenUrl"
                    id="tokenUrl"
                    value={oauthConfig.tokenUrl}
                    onChange={handleOAuthConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
          {selectedProvider === 'saml' && (
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="entityId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Entity ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="entityId"
                    id="entityId"
                    value={samlConfig.entityId}
                    onChange={handleSAMLConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="assertionConsumerServiceUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assertion Consumer Service URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="assertionConsumerServiceUrl"
                    id="assertionConsumerServiceUrl"
                    value={samlConfig.assertionConsumerServiceUrl}
                    onChange={handleSAMLConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="singleSignOnServiceUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Single Sign-On Service URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="singleSignOnServiceUrl"
                    id="singleSignOnServiceUrl"
                    value={samlConfig.singleSignOnServiceUrl}
                    onChange={handleSAMLConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="x509Certificate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  X.509 Certificate
                </label>
                <div className="mt-1">
                  <textarea
                    id="x509Certificate"
                    name="x509Certificate"
                    rows={3}
                    value={samlConfig.x509Certificate}
                    onChange={handleSAMLConfigChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mt-5">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Authentication Settings</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
            <p>Configure additional authentication settings.</p>
          </div>
          <div className="mt-5 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="multi-factor-auth"
                  name="multi-factor-auth"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="multi-factor-auth" className="font-medium text-gray-700 dark:text-gray-300">Enable Multi-Factor Authentication</label>
                <p className="text-gray-500 dark:text-gray-400">Require users to provide an additional form of identification when logging in.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="password-policy"
                  name="password-policy"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="password-policy" className="font-medium text-gray-700 dark:text-gray-300">Enforce Strong Password Policy</label>
                <p className="text-gray-500 dark:text-gray-400">Require users to create passwords that meet specific complexity requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityManagement;