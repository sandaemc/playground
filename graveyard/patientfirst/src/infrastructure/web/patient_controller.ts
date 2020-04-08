import { Get, Controller, Render, Post, Body, Res, Query } from '@nestjs/common';
import { PatientService } from '../../application/service/patient/patient_service';
import { PatientDTO } from '../../application/service/patient/patient_dto';
import { Response } from 'express';
import { PatientsViewModel } from '../view_models/patient/patients_view_model';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    @Render('template/patients/index')
    async index() {
        return { vm: new PatientsViewModel(await this.patientService.findAll()) }
    }

    @Get('/new')
    @Render('template/patients/new')
    new() { }

    @Post('/create')
    async create(@Body() data: PatientDTO, @Res() res: Response) {
        await this.patientService.create(data);
        res.redirect('/patients');
    }

    @Get('/edit')
    @Render('template/patients/edit')
    async edit(@Query('id') id: number) {
        return { patient: await this.patientService.findOne(id) };
    }

    @Post('/update')
    async update(@Query('id') id: number, @Body() data: PatientDTO, @Res() res: Response) {
        await this.patientService.update(id, data);
        res.redirect('/patients');
    }

    @Post('/delete')
    async delete(@Body('id') id: number, @Res() res: Response) {
        await this.patientService.delete(id);
        res.redirect('/patients');
    }

}
