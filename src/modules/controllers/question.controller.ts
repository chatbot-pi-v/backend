import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { QuestionClient } from '../services/question-api.client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { QuestionResponse } from '../types/question';

@Controller()
export class QuestionController {
  constructor(
    private readonly question: QuestionClient,
    private readonly firebaseService: FirebaseService
  ) {}

  @Post('/question')
  @HttpCode(200)
  async sendQuestion(@Body('question') question: string): Promise<QuestionResponse> {
    if (!question) {
      throw new Error('Nenhuma pergunta recebida');
    }

    try {
      const response = await this.question.sendQuestionClient(question);
      console.log('response = ', response)

      const answer = response.answer;
      
      const questionData = {
        question,
        answer,
        timestamp: new Date(),
      };

      await this.firebaseService.createDocument('questions', questionData);

      return response;
    } catch (error) {
      console.error('Erro ao processar pergunta:', error);
      throw error;
    }
  }
}
