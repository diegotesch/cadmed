import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';

import { Filtro } from './../../models/filtro';
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
  btDeletar: boolean = false;
  selecionado: number = null;
  medicos: Medico[] = [];
  medicos$: Observable<Medico[]>;
  filtro: Filtro = new Filtro();

  colunas = [
    { field: 'nome', header: 'Nome' },
    { field: 'crm', header: 'CRM' },
    { field: 'telefone', header: 'Telefone' },
    { field: 'especialidades', header: 'Especialidades' },
  ]

  constructor(
    private medicoService: MedicoService,
    private router: Router,
    private messageService: MessageService
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
    this.btDeletar = true;
    this.btEditar = true;
    this.selecionado = e.data.id;
  }

  rowUnSelect(e) {
    this.btDeletar = false;
    this.btEditar = false;
    this.selecionado = null;
  }

  cadastrar() {
    this.router.navigate(['medicos', 'novo']);
  }

  editar() {
    if (this.btEditar) {
      this.router.navigate(['medicos', this.selecionado]);
    }
  }

  deletar() {
    if (this.btDeletar) {
      this.requisicao = true;
      this.medicoService.remover(this.selecionado).pipe(
        finalize(() => this.requisicao = false)
      ).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'CRM inválido', detail: 'Médico excluído com sucesso.'});
        this.onRefresh();
      });
    }
  }

  filtrar() {

  }

}
