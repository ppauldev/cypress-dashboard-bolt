export interface CypressTest {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
}

export interface CypressTestSuite {
  name: string;
  tests: CypressTest[];
  duration: number;
}

export interface CypressReport {
  timestamp: string;
  username: string;
  totalDuration: number;
  testSuites: CypressTestSuite[];
}

export interface PersonaData {
  username: string;
  reports: CypressReport[];
}

export interface ChartData {
  date: string;
  duration: number;
}

export interface System {
  name: string;
  url: string;
  personasData: PersonaData[];
}