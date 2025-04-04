import { QuestionRequest } from "./QuestionRequest";

export interface QuestionSearchRequest {

    questionsDtoList: QuestionRequest[]; // lista de questões
    totalPages: number;
    pageNumber: number;
}