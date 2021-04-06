import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// import { version } from '../package.json';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);
}
