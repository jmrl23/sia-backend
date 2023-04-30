import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { DocsMiddleware } from './docs.middleware';
import { EJSService } from 'src/common/services/ejs/ejs.service';

@Module({
  imports: [],
  controllers: [DocsController],
  providers: [DocsService, EJSService],
})
export class DocsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DocsMiddleware).forRoutes('docs');
  }
}
