import { ImageRequest } from "./ImageRequest";

export interface AnswersRequest {
  id?: number;
  body: string;
  userId: number | string;
  questionId: number | string;
  createdDate?: Date | string;
  file: ImageRequest;
  convertedImg: any;
  approved: boolean;
  voteCount: number | string;   // captura a quantidade de votos
  voted: number | string;       // captura o valor do voto do usuário. 0 = não votou, 1 = votou para a pergunta, -1 = votou contra a pergunta
}
