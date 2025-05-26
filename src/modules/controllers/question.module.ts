import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionClient } from '../services/question-api.client';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [QuestionController],
  providers: [QuestionClient], 
  exports: [QuestionClient],
})
export class QuestionModule {}