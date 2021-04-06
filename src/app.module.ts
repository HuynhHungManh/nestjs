import './boilerplate.polyfill';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import connectionOptions from '../ormconfig';
import { SharedModule } from './shared/shared.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { ConfigService } from './shared/services/config.service';
import { contextMiddleware } from './middlewares';
import path from 'path';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module ({
   imports: [
     TypeOrmModule.forRoot(connectionOptions),
     ProductsModule,
     UserModule,
     AuthModule,
     SharedModule
   ],
   controllers: [],
   providers: [ConfigService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
