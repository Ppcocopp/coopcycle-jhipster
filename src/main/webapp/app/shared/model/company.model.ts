import { IPro } from '@/shared/model/pro.model';

export interface ICompany {
  id?: number;
  adress?: string;
  imageContentType?: string | null;
  image?: string | null;
  website?: string | null;
  description?: string | null;
  name?: string | null;
  mail?: IPro;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public adress?: string,
    public imageContentType?: string | null,
    public image?: string | null,
    public website?: string | null,
    public description?: string | null,
    public name?: string | null,
    public mail?: IPro
  ) {}
}
