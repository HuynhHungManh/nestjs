import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import connectionOptions from '../ormconfig';

@Module ({
   imports: [
     TypeOrmModule.forRoot(connectionOptions),
     ProductsModule
   ],
})
export class AppModule {}
