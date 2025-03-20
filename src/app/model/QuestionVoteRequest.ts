import { VoteTypeRequest } from './VoteTypeRequest.enum';
export interface QuestionVoteRequest {
    id?: number;
    voteType: VoteTypeRequest;
    userId: number | string;
    questionId: number;
}