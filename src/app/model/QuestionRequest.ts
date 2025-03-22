export interface QuestionRequest {
  id?: number; // ID da pergunta (opcional, para casos de atualização)
  title: string; // Título da pergunta
  body: string; // Corpo/descrição da pergunta
  tags: string[]; // Tags associadas à pergunta
  userId: number | string; // ID do usuário que está criando a pergunta
  createdDate?: Date | string; // Data de criação
  username: string;    // captura o nome do usuário
  voteCount: number | string;   // captura a quantidade de votos
  voted: number | string;       // captura o valor do voto do usuário. 0 = não votou, 1 = votou para a pergunta, -1 = votou contra a pergunta
}
