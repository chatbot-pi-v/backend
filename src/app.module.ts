import { Module } from '@nestjs/common';
import { QuestionModule } from './modules/controllers/question.module';

@Module({
  imports: [QuestionModule],
})
export class AppModule {}
