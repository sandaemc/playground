import { Module } from '@nestjs/common';
import { PatientController } from './patient_controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../../domain';
import { PatientService } from '../../application/service/patient/patient_service';
import { PatientRepository } from '../orm';

@Module({
    imports: [TypeOrmModule.forFeature([Patient, PatientRepository])],
    controllers: [PatientController],
    providers: [PatientService]
})
export class PatientModule {};
