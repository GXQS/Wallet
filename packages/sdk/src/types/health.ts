export interface HealthResponse {
  status: 'alive' | 'ready';
  timestamp: string;
}
