export interface CommonError {
  code: string;
  description: string;
  statusCode?: number;
}

export interface CriticalError extends CommonError {
  isUnexpected: true;
}
