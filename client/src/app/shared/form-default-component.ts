import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms'
import { EventEmitter, Output } from '@angular/core'

export abstract class FormDefaultComponent {
  formulario: FormGroup;
  formSubmetido: boolean = false;
  formEnviado: boolean = false;
  exibe: boolean = false

  constructor() {
  }

  get form() { return this.formulario.controls; }

  validarFormulario() {
    if (this.formulario.invalid) {
        Object.keys(this.formulario.controls).forEach(campo => {
            this.formulario.get(campo).markAsTouched();
        });
        this.formSubmetido = true;
        this.formEnviado = true;
        return false;
    }

    return true;
  }

  isObrigatorio(formulario: FormGroup, campo: string, submitedForm: boolean, apenasNoSubmit: boolean = false): boolean {
    return (formulario.get(campo).hasError('required') && this.naoValidoOuSubmetido(formulario, campo, submitedForm, apenasNoSubmit));
  }

  naoValidoOuSubmetido(formulario: FormGroup, campo: string, submitedForm: boolean, apenasNoSubmit: boolean): boolean {
      return (formulario.get(campo).dirty && !apenasNoSubmit || formulario.get(campo).touched && !apenasNoSubmit || submitedForm);
  }

  abstract iniciarForm();

  private errorsType: any[] = [
    { id: 'required', mensagem: 'Preenchimento Obrigatório' },
    { id: 'minlength', mensagem: 'Campo não atende a quantidade mínima de caracteres: ' },
    { id: 'maxlength', mensagem: 'Campo excede a quandidade máxima de caracteres: ' },
    { id: 'pattern', mensagem: 'Campo contêm caracteres inválidos' },
    { id: 'email', mensagem: 'Insira um endereço de e-mail válido' }
  ]

  getErrorMsg(campo: string) {
    let type = this.errorsType.filter(err => this.form[campo].errors[err.id])[0]
    let { requiredLength } = this.form[campo].errors[type.id]
    return `${type.mensagem} ${requiredLength || ''}`
  }

  public getError(campo: string) {
    if (this.formSubmetido && this.form[campo].errors) {
      return this.errorsType.some(err => this.form[campo].errors[err.id]);
    }
    return
  }

  fecharModal() {
    this.formSubmetido = false;
    this.formEnviado = false;
    this.exibe = false;
    this.iniciarForm();
  }

  dataBr = {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar'
  };

}
