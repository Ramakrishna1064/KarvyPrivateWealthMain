import { PotentialChildObject } from './PotentialChildObject';
export interface PotentialParentObject {
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: string;
    first: boolean;
    numberOfElements: number;
    size: number,
    number: number;
    content: PotentialChildObject[];
  }
