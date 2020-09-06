import { Router } from '@angular/router';
import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'

import {MessageService} from 'primeng/api'

import { Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'

import { TokenStorageService } from './token-storage.service'

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request
    const token = this.token.getToken()

    if (token) {
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      })
    }

    return next.handle(authReq)
      .pipe(
        tap((evento: HttpEvent<any>) => {
        if (evento instanceof HttpResponse) {
          if(evento.body && evento.status == 200) {
            console.log(evento.body);
            let {message, title, error, user} = evento.body;
            let severity = error ? 'error' : 'success'
            if (message || title) {
              this.messageService.add({severity: severity, summary: title, detail: message});
            }
            if (user) {
              this.messageService.add({severity: severity, summary: `Bem Vindo ${user.name}`, detail: 'Login realizado com sucesso!'});
            }
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.messageService.add({severity:'error', summary: err.error.title, detail: err.error.message})
          } catch(e) {
            this.messageService.add({severity:'error', summary:'Falha', detail: 'Ocorreu um erro inesperado. Entre em contato com o administrador'});
          }
        }
        return of(err)
      })
    )
  }
}
