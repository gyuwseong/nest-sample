import { CommonError } from './error.interface';

export const FailedToVerifyJwtError: CommonError = {
  code: 'FailedToVerifyJwtError',
  description: '인증에 실패했습니다',
  statusCode: 401,
};

export const EmptyTokenError: CommonError = {
  code: 'EmptyTokenError',
  description: '토큰이 필요합니다',
  statusCode: 401,
};

export const BearerTypeTokenRequiredError: CommonError = {
  code: 'BearerTypeTokenRequiredError',
  description: 'Bearer 타입의 토큰을 요청해야합니다',
  statusCode: 401,
};

export const ExpiredJWTError: CommonError = {
  code: 'ExpiredJWTError',
  description: '만료된 토큰입니다',
  statusCode: 401,
};
