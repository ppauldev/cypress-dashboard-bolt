import React, { useMemo, useState } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { PersonaData, ChartData } from '../types';
import TestSuiteDetails from './TestSuiteDetails';
import WarningBoundary from './WarningBoundary';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DashboardProps {
  personasData: PersonaData[];
}

const Dashboard: React.FC<DashboardProps> = ({ personasData }) => {
  const [expandedPersonas, setExpandedPersonas] = useState<string[]>([]);

  const { overallChartData, dateRange } = useMemo(() => {
    const allDates = personasData.flatMap(persona => 
      persona.reports.map(report => new Date(report.timestamp))
    );
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    const data: { [key: string]: { [key: string]: number } } = {};
    const dateArray: Date[] = [];
    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      data[dateStr] = {};
      dateArray.push(new Date(d));
    }

    personasData.forEach(persona => {
      persona.reports.forEach(report => {
        const date = new Date(report.timestamp).toISOString().split('T')[0];
        data[date][persona.username] = report.totalDuration;
      });
    });

    const chartData = Object.entries(data).map(([date, durations]) => ({
      date,
      ...durations,
    }));

    return { 
      overallChartData: chartData, 
      dateRange: { min: minDate, max: maxDate } 
    };
  }, [personasData]);

  const togglePersona = (username: string) => {
    setExpandedPersonas(prev =>
      prev.includes(username)
        ? prev.filter(u => u !== username)
        : [...prev, username]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cypress Test Dashboard</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Overall Test Duration by Persona</h2>
        <WarningBoundary>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={overallChartData}>
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
              {personasData.map((persona, index) => (
                <Line
                  key={persona.username}
                  type="monotone"
                  dataKey={persona.username}
                  stroke={`hsl(${index * 137.5 % 360}, 70%, 50%)`}
                  name={`${persona.username} Duration`}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </WarningBoundary>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Persona Details</h2>
        {personasData.map((persona) => (
          <div key={persona.username} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => togglePersona(persona.username)}
            >
              <h3 className="text-lg font-medium text-gray-800">
                Persona: {persona.username}
              </h3>
              {expandedPersonas.includes(persona.username) ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedPersonas.includes(persona.username) && (
              <div className="mt-4">
                <TestSuiteDetails persona={persona} dateRange={dateRange} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;