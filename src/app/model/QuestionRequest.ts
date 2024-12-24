export interface QuestionRequest {
  id?: number; // ID da pergunta (opcional, para casos de atualização)
  title: string; // Título da pergunta
  body: string; // Corpo/descrição da pergunta
  tags: string[]; // Tags associadas à pergunta
  userId: number | string; // ID do usuário que está criando a pergunta
  createdDate?: Date; // Data de criação
  username: string    // captura o nome do usuário
}
