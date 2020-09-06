import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { FormDefaultComponent } from './../shared/form-default-component';
import { Login } from './../models/Login';
import { LoginService } from './login.service';
import { TokenStorageService } from './../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormDefaultComponent implements OnInit {

  credenciais: Login = new Login();
  requisicao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenStorageService
  ) {
    super();
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.router.navigate(['medicos']);
    }
    this.iniciarForm();
  }

  iniciarForm() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {

    if (this.validarFormulario()) {
      this.requisicao = true;
      this.loginService.entrar(this.credenciais)
        .pipe(finalize(() => this.requisicao = false))
        .subscribe(res => {
          let { access_token, user } = res;
          this.tokenService.saveToken(access_token);
          this.tokenService.saveUser(user);

          window.location.reload();
        })
    }
  }

}
