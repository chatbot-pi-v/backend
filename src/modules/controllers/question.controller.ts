import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { QuestionResponse } from '../types/question';
import { QuestionClient } from '../services/question-api.client';

@Controller()
export class QuestionController {
  constructor(private readonly question: QuestionClient) {}

  @Post('/question')
  @HttpCode(200)
  async sendQuestion(@Body('question') question: string): Promise<QuestionResponse> {
    if (!question) {
      throw new Error('Nenhuma pergunta recebida');
    }

    return await this.question.sendQuestionClient(question);
  }
}
