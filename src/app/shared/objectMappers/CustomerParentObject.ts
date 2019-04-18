import { CustomerChildObject } from './CustomerChildObject';
export interface CustomerParentObject {
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
  size: number,
  number: number;
  content: CustomerChildObject[];
}
