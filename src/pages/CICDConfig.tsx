import React, { useState } from 'react';
import { GitBranch, Check } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CICDConfig: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<'jenkins' | 'azure' | null>(null);
  const [pipelineConfig, setPipelineConfig] = useState('');

  const handleProviderSelect = (provider: 'jenkins' | 'azure') => {
    setSelectedProvider(provider);
    setPipelineConfig(provider === 'jenkins' ? jenkinsGroovyExample : azureYamlExample);
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPipelineConfig(event.target.value);
  };

  const jenkinsGroovyExample = `
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
  `.trim();

  const azureYamlExample = `
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- script: echo Hello, world!
  displayName: 'Run a one-line script'

- script: |
    echo Add other tasks to build, test, and deploy your project.
    echo See https://aka.ms/yaml
  displayName: 'Run a multi-line script'
  `.trim();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">CI/CD Configuration</h1>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Select CI/CD Provider</h3>
          <div className="mt-4 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center">
              <input
                id="jenkins"
                name="provider"
                type="radio"
                checked={selectedProvider === 'jenkins'}
                onChange={() => handleProviderSelect('jenkins')}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="jenkins" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Jenkins (Groovy)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="azure"
                name="provider"
                type="radio"
                checked={selectedProvider === 'azure'}
                onChange={() => handleProviderSelect('azure')}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="azure" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Azure DevOps (YAML)
              </label>
            </div>
          </div>
        </div>
      </div>

      {selectedProvider && (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Pipeline Configuration</h3>
            <div className="mt-4">
              <SyntaxHighlighter language={selectedProvider === 'jenkins' ? 'groovy' : 'yaml'} style={docco}>
                {pipelineConfig}
              </SyntaxHighlighter>
              <textarea
                rows={10}
                className="mt-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={pipelineConfig}
                onChange={handleConfigChange}
              />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CICDConfig;