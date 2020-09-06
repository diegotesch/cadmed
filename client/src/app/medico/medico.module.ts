import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';

import { BlockModule } from './../shared/block/block.module';

import { MedicoListComponent } from './medico-list/medico-list.component';
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { PhonePipe } from './../pipes/phone.pipe';
import { PhoneDirective } from './../directives/phone.directive';


@NgModule({
  declarations: [
    MedicoListComponent,
    MedicoFormComponent,
    PhonePipe,
    PhoneDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    BlockModule,
    CalendarModule,
    InputMaskModule
  ]
})
export class MedicoModule { }
