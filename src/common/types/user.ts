import { Prisma } from '@prisma/client';

export type User = Omit<
  Prisma.UserGetPayload<{
    include: {
      UserInformation: {
        LuponCase: true;
        LuponTanggapan: true;
        Clearance: true;
        include: {
          Picture: true;
        };
      };
    };
  }>,
  'password'
>;
