import React from 'react';
import { System } from '../types';

interface SystemSelectorProps {
  systems: System[];
  selectedSystem: System;
  onSelectSystem: (system: System) => void;
}

const SystemSelector: React.FC<SystemSelectorProps> = ({ systems, selectedSystem, onSelectSystem }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Cypress Dashboard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {systems.map((system) => (
                <button
                  key={system.name}
                  onClick={() => onSelectSystem(system)}
                  className={`${
                    selectedSystem.name === system.name
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {system.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSelector;