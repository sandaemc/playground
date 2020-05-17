import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app_controller';
import { PatientModule } from './patient_module';

@Module({
    imports: [TypeOrmModule.forRoot(), PatientModule],
    controllers: [AppController]
})
export class AppModule {};
