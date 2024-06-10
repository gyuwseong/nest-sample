import { CommonError } from './error.interface';

export const NotFoundTweetError: CommonError = {
  code: 'NotFoundTweetError',
  description: '트윗을 찾을 수 없습니다',
};
