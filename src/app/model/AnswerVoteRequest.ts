import { VoteTypeRequest } from "./VoteTypeRequest.enum";

export interface AnswerVoteRequest {
    id?: number;
    voteType: VoteTypeRequest;
    userId: number | string;
    answersId: number | string;
}