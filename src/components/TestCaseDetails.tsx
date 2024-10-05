import React from 'react';
import { CypressTestSuite } from '../types';

interface TestCaseDetailsProps {
  testSuite: CypressTestSuite;
}

const TestCaseDetails: React.FC<TestCaseDetailsProps> = ({ testSuite }) => {
  const getStatusColor = (status: 'passed' | 'failed' | 'skipped') => {
    switch (status) {
      case 'passed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'skipped':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div>
      <h5 className="text-md font-medium text-gray-700 mb-2">{testSuite.name}</h5>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (ms)</th>
            </tr>
          </thead>
          <tbody>
            {testSuite.tests.map((test, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 whitespace-nowrap">{test.name}</td>
                <td className={`px-4 py-2 whitespace-nowrap ${getStatusColor(test.status)}`}>
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{test.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestCaseDetails;