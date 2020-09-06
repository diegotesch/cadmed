import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';

import { Medico } from './../../models/medico';
import { MedicoService } from './../medico.service';
import { Especialidade } from './../../models/especialidade';


@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})
export class MedicoListComponent implements OnInit {

  requisicao: boolean = false;
  loading: boolean = false;
  btEditar: boolean = false;
  selecionado: number = null;
  medicos: Medico[] = [];
  medicos$: Observable<Medico[]>;

  constructor(
    private medicoService: MedicoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  listarMedicos() {
    this.requisicao = true;
    this.medicos$ = this.medicoService.listar()
    .pipe(
      finalize(() => this.requisicao = false)
    )
  }

  onRefresh() {
    this.listarMedicos();
  }

  rowSelect(e) {
    // this.btVisualizar = true;
    this.btEditar = true;
    this.selecionado = e.data.id;
  }

  rowUnSelect(e) {
    // this.btVisualizar = false;
    this.btEditar = false;
    this.selecionado = null;
  }

  cadastrar() {
    this.router.navigate(['medico']);
  }

  editar() {
    if (this.btEditar) {
      this.router.navigate(['medico', this.selecionado]);
    }
  }

}
