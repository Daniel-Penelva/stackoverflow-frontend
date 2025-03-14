import { AnswersRequest } from "./AnswersRequest";
import { QuestionRequest } from "./QuestionRequest";

export interface SingleQuestionRequest {
  
  questionsDTO: QuestionRequest;
  answersDTOList: AnswersRequest[];  // Lista de respostas
}
