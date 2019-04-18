import { CallMettingChildObject } from './CallMettingChildObject';

export interface CallMettingParentObject {
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: string;
    first: boolean;
    numberOfElements: number;
    size: number,
    number: number;
    content: CallMettingChildObject[];
}

