import { NestFactory } from '@nestjs/core';
import { AppModule } from './app_module';
import { join } from 'path';
import { createEngine } from 'express-react-views';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useStaticAssets(join(__dirname, '..', '..', '..', '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));

    app.engine('js', createEngine({ transformViews: true }));
    app.setViewEngine('js');
    
    await app.listen(3000);
}

bootstrap();