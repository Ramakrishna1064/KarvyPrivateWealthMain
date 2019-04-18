import { LeadsChildObject } from './LeadsChildObject';
export interface LeadsParentObject {
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
  size: number,
  number: number;
  content: LeadsChildObject[];
}
