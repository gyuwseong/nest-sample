import {
  createParamDecorator,
  ExecutionContext,
  PipeTransform,
  Type,
} from '@nestjs/common';

export const GetUser: (
  ...dataOrPipes: (Type<PipeTransform> | PipeTransform)[]
) => ParameterDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
