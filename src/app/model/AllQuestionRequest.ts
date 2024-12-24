import { QuestionRequest } from "./QuestionRequest";

export interface AllQuestionRequest {
    questionsDtoList: QuestionRequest[];  // Lista de perguntas
    totalPages: number;                   // Total de páginas disponíveis
    pageNumber: number;                   // Número da página atual
}
