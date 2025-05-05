import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionClient } from '../services/question-api.client';

@Module({
  controllers: [QuestionController],
  providers: [QuestionClient],
  exports: [QuestionClient],
})
export class QuestionModule {}