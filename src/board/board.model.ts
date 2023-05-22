export interface Board {
  id: string;
  title: string;
  description: string;
  status: Boardstatus;
}
export enum Boardstatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
