import { Usuario } from './../../models/usuario';
import { Injectable } from '@angular/core'

const tokenKey = 'auth-token'
const userKey = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public logout ():void {
    window.sessionStorage.clear();
  }

  public saveToken (token: string): void {
    window.sessionStorage.removeItem(tokenKey)
    window.sessionStorage.setItem(tokenKey, token)
  }

  public getToken (): string {
    return sessionStorage.getItem(tokenKey)
  }

  public saveUser (data): void {
    window.sessionStorage.removeItem(userKey)
    window.sessionStorage.setItem(userKey, this.prepararUser(data))
  }

  private prepararUser(data) {
    let user = new Usuario()
    user.id = data.id
    user.name = data.name
    user.email = data.email
    return JSON.stringify(user)
  }

  public getUser (): any {
   return JSON.parse(sessionStorage.getItem(userKey))
  }
}
