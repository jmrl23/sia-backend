import { Prisma } from '@prisma/client';

export type User = Omit<
  Prisma.UserGetPayload<{
    include: {
      UserInformation: {
        include: {
          Picture: true;
        };
      };
    };
  }>,
  'password'
>;
