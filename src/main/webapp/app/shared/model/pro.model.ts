import { IUser } from '@/shared/model/user.model';

export interface IPro {
  id?: number;
  description?: string | null;
  mail?: IUser;
}

export class Pro implements IPro {
  constructor(public id?: number, public description?: string | null, public mail?: IUser) {}
}
