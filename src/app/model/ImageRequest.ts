export interface ImageRequest {
    id: number;
    name: string;
    type: string;
    data: string; // Base64 para representar a imagem no front-end
    answerId: number; // ID da resposta associada
}
