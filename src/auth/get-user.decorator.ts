import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTable } from './user_table.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserTable => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
