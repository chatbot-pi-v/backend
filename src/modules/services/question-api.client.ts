import { Injectable } from "@nestjs/common";
import { QuestionResponse } from "../types/question";
import axios from "axios";

@Injectable()
export class QuestionClient {
  private readonly endpoint = 'http://localhost:5050/question';

  constructor () {}

  async sendQuestionClient(question: string): Promise<QuestionResponse> {
    try {
      const response = await axios.post<QuestionResponse>(this.endpoint, { question });

      return response.data;
    } catch (error) {
      console.error('Erro ao enviar pergunta:', error);
      throw error;
    }
  }
}