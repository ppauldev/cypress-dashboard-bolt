import React, { useMemo } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { PersonaData, ChartData } from '../types';
import WarningBoundary from './WarningBoundary';

interface TestSuiteDetailsProps {
  persona: PersonaData;
  dateRange: { min: Date; max: Date };
}

const TestSuiteDetails: React.FC<TestSuiteDetailsProps> = ({ persona, dateRange }) => {
  const suiteChartData: { [key: string]: ChartData[] } = useMemo(() => {
    const data: { [key: string]: { [key: string]: number } } = {};
    persona.reports.forEach(report => {
      const date = new Date(report.timestamp).toISOString().split('T')[0];
      report.testSuites.forEach(suite => {
        if (!data[suite.name]) {
          data[suite.name] = {};
        }
        data[suite.name][date] = suite.duration;
      });
    });

    const chartData: { [key: string]: ChartData[] } = {};
    Object.entries(data).forEach(([suiteName, suiteData]) => {
      chartData[suiteName] = [];
      for (let d = new Date(dateRange.min); d <= dateRange.max; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split('T')[0];
        chartData[suiteName].push({
          date,
          duration: suiteData[date] || null,
        });
      }
    });

    return chartData;
  }, [persona, dateRange]);

  return (
    <div>
      {Object.entries(suiteChartData).map(([suiteName, chartData]) => (
        <div key={suiteName} className="mb-6">
          <h4 className="text-lg font-medium text-gray-700 mb-2">{suiteName}</h4>
          <WarningBoundary>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  type="category"
                  domain={[dateRange.min.toISOString().split('T')[0], dateRange.max.toISOString().split('T')[0]]}
                  tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Duration" connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </WarningBoundary>
        </div>
      ))}
    </div>
  );
};

export default TestSuiteDetails;