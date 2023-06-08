import env from './configurations/env';
import {
  type CacheStore,
  type MiddlewareConsumer,
  type NestModule,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { DocsModule } from './docs/docs.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaService } from './common/services/prisma/prisma.service';
import { JWTService } from './common/services/jwt/jwt.service';
import { FileModule } from './file/file.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from './common/guards';
import {
  RequestUserMiddleware,
  HelmetMiddleware,
  LoggerMiddleware,
} from './common/middlewares';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LuponModule } from './lupon/lupon.module';
import { ClearanceModule } from './clearance/clearance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
      ignoreEnvFile: true,
      encoding: 'utf-8',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: (await redisStore({
          url: configService.get<URL>('REDIS_URL').toString(),
        })) as unknown as CacheStore,
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60 * 5,
      limit: 500,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
    DocsModule,
    UserModule,
    ClearanceModule,
    LuponModule,
    FileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrismaService,
    JWTService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, HelmetMiddleware, RequestUserMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
