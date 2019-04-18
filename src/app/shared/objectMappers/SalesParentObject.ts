import { SalesChildObject } from './SalesChildObject';
export interface SalesParentObject {
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
  size: number,
  number: number;
  content: SalesChildObject[];
}
