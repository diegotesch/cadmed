export class MessageUtil {

  public static ERROR_MESSAGE = 'Ocorreu um erro inesperado!';

  public static formatarMensagemExclusaoLonga(msgPadrao: any, msgComplemento: any, icone: any) {
      return '<div class="ui-g-2"><i class="ng-tns-c6-5 ' + icone + ' fa ng-star-inserted"></i></div><div class="ui-g-10 confirmTexto">' + msgPadrao + msgComplemento + '</div>';
  }

  public static formatarMensagemEaprog(msgPadrao: any, msgComplemento: any, caixaTexto: any) {
      return '<div><strong>' + caixaTexto + '</strong></div><div class="confirmTextoEAProg"><p>' + msgPadrao + '</p></div>' + '<div class="confirmTexto">' + msgComplemento + '</div>';
  }
}
