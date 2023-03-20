import { IUser } from '@/shared/model/user.model';

export interface ICustomer {
  id?: number;
  adress?: string;
  balance?: number;
  phone?: string | null;
  mail?: IUser;
}

export class Customer implements ICustomer {
  constructor(public id?: number, public adress?: string, public balance?: number, public phone?: string | null, public mail?: IUser) {}
}
