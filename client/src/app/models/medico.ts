import { Especialidade } from './especialidade';

export class Medico {
  constructor(
    public id?: number,
    public nome?: string,
    public crm?: string,
    public telefone?: string,
    public especialidades?: number[]
  ) {

  }
}
