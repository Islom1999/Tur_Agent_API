import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './httpExeption';

@Module({
  imports: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class SharedModule {}
