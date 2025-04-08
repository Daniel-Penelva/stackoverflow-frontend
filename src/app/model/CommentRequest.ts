export interface CommentRequest {
  id?: number; // opcional na criação
  body: string;
  createdDate?: Date; // opcional na criação
  answersId: number;
  userId: number | string; // string para compatibilidade com o backend
  username: string;
}
