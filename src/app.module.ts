import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './users/service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    ServiceModule;
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
