import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DurableModule } from './durable.module';

@Module({
  imports: [DurableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
