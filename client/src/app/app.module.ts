import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { MessageService } from 'primeng/api';

import { AuthInterceptor } from './services/auth/auth.interceptor';

import { LoginModule } from './login/login.module';
import { MedicoModule } from './medico/medico.module';
import { BlockModule } from './shared/block/block.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ButtonModule,
    TooltipModule,
    LoginModule,
    MedicoModule,
    BlockModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
