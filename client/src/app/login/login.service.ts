import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from './../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly login = `/api/entrar`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  public entrar (credenciais: Login): Observable<any> {
    return this.http.post(`${this.login}`, credenciais, this.httpOptions)
  }
}
