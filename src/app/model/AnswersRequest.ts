export interface AnswersRequest {
  id?: number;
  body: string;
  userId: number | string;
  questionId: number | string;
  createdDate?: Date | string;
}
