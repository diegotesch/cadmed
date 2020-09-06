import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BlockUIModule} from 'primeng/blockui'
import {ProgressSpinnerModule} from 'primeng/progressspinner'

import { BlockComponent } from './block.component';



@NgModule({
  declarations: [BlockComponent],
  imports: [
    CommonModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    BlockComponent
  ]
})
export class BlockModule { }
