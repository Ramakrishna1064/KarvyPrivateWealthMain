import { DashBoardChildObject } from './DahBoardChildObject';

export interface DashBoardParentObject {
  status: string;
  message: string;
  responseCode: string;
  opsCallMeetingResponse: DashBoardChildObject[];
  totalPages: number;
  totalEntities: number;
}
