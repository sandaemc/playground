import { Module } from '@nestjs/common';
import { AppController } from './app_controller';

@Module({
    imports: [],
    controllers: [AppController]
})
export class AppModule {};