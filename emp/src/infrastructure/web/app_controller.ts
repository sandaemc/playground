import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {

    @Get()
    @Render('app/index')
    root() {
        return { message: 'Hello' };
    }
}