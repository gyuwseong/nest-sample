import { CommonError } from './error.interface';

export const DuplicateUsernameError: CommonError = {
  code: 'DuplicateUsernameError',
  description: '중복된 유저네임입니다.',
};

export const InvalidPasswordError: CommonError = {
  code: 'InvalidPasswordError',
  description: '비밀번호가 일치하지 않습니다',
};

export const InvalidUserError: CommonError = {
  code: 'InvalidUserError',
  description: '유저가 일치하지 않습니다',
};

export const NotFoundUserError: CommonError = {
  code: 'NotFoundUserError',
  description: '유저를 찾을 수 없습니다',
};

export const SignUpFailError: CommonError = {
  code: 'SignUpFailError',
  description: '회원 가입에 실패하였습니다',
};
