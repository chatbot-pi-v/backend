import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './modules/controllers/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuestionModule
  ],
})
export class AppModule {}