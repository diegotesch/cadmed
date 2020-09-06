import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Medico } from './../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private readonly api = '/api/medicos';

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<any> {
    return this.http.get(`${this.api}`);
  }

  public salvar(dados: Medico): Observable<any> {
    if (!dados.id) {
      return this.cadastrar(dados);
    }
    return this.atualizar(dados);
  }

  public obterPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  public remover(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  private cadastrar(dados: Medico): Observable<any> {
    return this.http.post(`${this.api}`, dados);
  }

  private atualizar(dados: Medico): Observable<any> {
    return this.http.put(`${this.api}`, dados);
  }
}
