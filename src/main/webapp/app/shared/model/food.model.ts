import { ICompany } from '@/shared/model/company.model';

export interface IFood {
  id?: number;
  mealName?: string;
  price?: number;
  decription?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  name?: ICompany;
}

export class Food implements IFood {
  constructor(
    public id?: number,
    public mealName?: string,
    public price?: number,
    public decription?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public name?: ICompany
  ) {}
}
