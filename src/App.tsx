import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import SystemSelector from './components/SystemSelector';
import { System } from './types';

const generateReports = (baseDate: Date, baseDuration: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    const durationVariation = Math.random() * 20000 - 10000; // Random variation between -10000 and 10000
    return {
      timestamp: date.toISOString(),
      username: `user${(i % 2) + 1}`,
      totalDuration: Math.max(0, Math.round(baseDuration + durationVariation)),
      testSuites: [
        {
          name: "Suite 1",
          duration: Math.round((baseDuration + durationVariation) * 0.5),
          tests: [
            { name: 'Test 1', status: Math.random() > 0.1 ? 'passed' : 'failed', duration: Math.round(Math.random() * 1000 + 500) },
            { name: 'Test 2', status: Math.random() > 0.1 ? 'passed' : 'failed', duration: Math.round(Math.random() * 1000 + 500) },
          ]
        },
        {
          name: "Suite 2",
          duration: Math.round((baseDuration + durationVariation) * 0.5),
          tests: [
            { name: 'Test 3', status: Math.random() > 0.1 ? 'passed' : 'failed', duration: Math.round(Math.random() * 1000 + 500) },
            { name: 'Test 4', status: Math.random() > 0.05 ? 'passed' : 'skipped', duration: Math.round(Math.random() * 1000 + 500) },
          ]
        }
      ]
    };
  });
};

const App: React.FC = () => {
  const baseDate = new Date('2024-03-01T12:00:00Z');
  const systems: System[] = [
    {
      name: "Production",
      url: "https://production.example.com",
      personasData: [
        {
          username: "user1",
          reports: generateReports(baseDate, 120000, 15).filter(report => report.username === "user1")
        },
        {
          username: "user2",
          reports: generateReports(baseDate, 130000, 15).filter(report => report.username === "user2")
        }
      ]
    },
    {
      name: "Staging",
      url: "https://staging.example.com",
      personasData: [
        {
          username: "user1",
          reports: generateReports(baseDate, 115000, 15).filter(report => report.username === "user1")
        },
        {
          username: "user2",
          reports: generateReports(baseDate, 125000, 15).filter(report => report.username === "user2")
        }
      ]
    },
    {
      name: "Development",
      url: "https://dev.example.com",
      personasData: [
        {
          username: "user1",
          reports: generateReports(baseDate, 110000, 15).filter(report => report.username === "user1")
        },
        {
          username: "user2",
          reports: generateReports(baseDate, 120000, 15).filter(report => report.username === "user2")
        }
      ]
    }
  ];

  const [selectedSystem, setSelectedSystem] = useState<System>(systems[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      <SystemSelector
        systems={systems}
        selectedSystem={selectedSystem}
        onSelectSystem={setSelectedSystem}
      />
      <div className="p-6">
        <Dashboard personasData={selectedSystem.personasData} />
      </div>
    </div>
  );
};

export default App;