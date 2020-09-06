import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { SelectItem, MessageService } from 'primeng/api';
import { finalize, tap, switchMap } from 'rxjs/operators';

import { FormDefaultComponent } from './../../shared/form-default-component';
import { Especialidade } from './../../models/especialidade';
import { Medico } from './../../models/medico';
import { MedicoService } from './../medico.service';
import { EspecialidadeService } from './../especialidade.service';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html',
  styleUrls: ['./medico-form.component.css']
})
export class MedicoFormComponent extends FormDefaultComponent implements OnInit, AfterContentChecked {
  requisicao: boolean = false;
  editar: boolean = false;
  especialidadesErrors: boolean = false;
  titulo: string = 'Cadastro de médicos';
  medico: Medico = new Medico();
  especialidades: SelectItem[] = [];
  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ',
    'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private medicoService: MedicoService,
    private especialidadeService: EspecialidadeService,
    private messageService: MessageService
  ) {
    super();
  }

  carregarMedico() {
    this.setAcaoAtual();
    if (this.editar) {
      this.requisicao = true;
      this.activeRoute.paramMap.pipe(
        switchMap(params => this.medicoService.obterPorId(+params.get('id')))
      ).subscribe(medico => {
        this.medico = medico;
        this.prepararEspecialidades(medico);

        this.formulario.patchValue(this.medico);
        this.requisicao = false;
      })
    }
  }

  prepararEspecialidades(medico) {
    this.medico.especialidades = medico.especialidades.map(especialidade => especialidade.id);
  }

  listarEspecialidades() {
    this.requisicao = true;
    this.especialidadeService.listar().pipe(
      finalize(() => this.requisicao = false)
    ).subscribe(especialidades => {
      this.especialidades = this.converterDropdown(especialidades, 'descricao', 'id');
    })
  }

  ngOnInit() {
    this.listarEspecialidades();
    this.iniciarForm();
    this.carregarMedico();
  }

  ngAfterContentChecked() {
    this.setTitle();
  }

  iniciarForm() {
    this.formulario = this.formBuilder.group({
      'id': [null],
      'nome': [null, [Validators.required, Validators.minLength(3)]],
      'crm': [null, [Validators.required, Validators.maxLength(9)]],
      'telefone': [null, [Validators.minLength(15), Validators.maxLength(17)]],
      'especialidades': [null, Validators.required]
    })
  }

  salvar() {
    if (this.validarFormulario()) {
      this.requisicao = true;
      const medico = Object.assign(new Medico(), this.formulario.value);
      this.medicoService.salvar(medico).pipe(
        finalize(() => this.requisicao = false)
      ).subscribe(() => this.router.navigate(['medicos']))
    }
  }

  cancelar() {
    this.router.navigate(['medicos']);
  }

  verificarCrm() {
    const estadoSelecionado = this.formulario.get('crm').value.split('/')[1];
    if (!this.estados.some(estado => estado == estadoSelecionado)) {
      this.messageService.add({severity: 'error', summary: 'CRM inválido', detail: 'Verifique se o CRM digitado está correto.'});
    }
  }

  checkMascara() {
    if (this.medico.telefone) {
      let val = this.medico.telefone.replace(/\D/g, '');
      if (val.length < 10) {
        this.medico.telefone = '';
      }
    }
  }

  checarQuantidadeEspecialidadesSelecionadas(e) {
    this.especialidadesErrors = e.value.length < 2;
  }

  private setAcaoAtual() {
    this.editar = this.activeRoute.snapshot.url[1].path == 'novo' ? false : true;
  }

  private setTitle() {
    this.titulo = 'Cadastrar Médico';
    if (this.editar)
      this.titulo = 'Editar Médico';
  }

}
