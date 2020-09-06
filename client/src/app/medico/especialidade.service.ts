import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Especialidade } from './../models/especialidade';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  private readonly api = '/api/especialidades';

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<any> {
    return this.http.get(`${this.api}`);
  }

  public minLengthArray(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
        if (c.value.length >= min)
            return null;

        return { 'minLengthArray': {valid: false }};
    }
  }
}
