import { Component, ViewChild, AfterViewInit } from '@angular/core';
import Inputmask from "inputmask";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit {
  name = 'Angular';

  cpfMask = '000.000.000-00';

  @ViewChild('telInput') telInput;  
  @ViewChild('currencyInput') currencyInput;

  fixoMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; 
  celMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  telMask = this.fixoMask;

  cpfMask2 = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  cnpjMask = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];  
  cepMask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];

  telefone='';
  telefoneMask = "(00) 0000-0000";

  ngAfterViewInit(){
    // sem isso nao remove a mascara
    Inputmask.extendDefaults({
      'autoUnmask': true
    });

    Inputmask(
        {
          mask: ["(99) 9999-9999", "(99) 99999-9999"],
          definitions: {
            "(99) 9999-9999": {
              'autoUnmask': true
            },
            "*":{
              'autoUnmask': true,
              jitMasking: false
            }
          }
        }
      ).mask(this.telInput.nativeElement);            

    Inputmask(
        { alias: "currency", jitMasking: false, numericInput: true, autoUnmask: true, radixPoint: ',', groupSeparator: '.'}
      ).mask(this.currencyInput.nativeElement);
  }

  myModel1='';
  telMaskChange(){
    this.myModel1 = this.myModel1.replace(/\D+/g, '');
  }
  myModel2;
  telCpfChange(){
    this.myModel2 = this.myModel2.replace(/\D+/g, '');
  }

  keyPress(key) {
    const length = this.myModel1.length;

    if(key.replace(/\D+/g, '').length == 0) {
      // nao eh numero
      if (length == 11 ){
        this.telMask = this.fixoMask;
      }
      return;
    }

    if (!(length > 10)) {
      if(length >= 10) {
        console.log('numero');
        this.telMask = this.celMask;
      } else {
        this.telMask = this.fixoMask;
      }
    } else {

    }
  }

  keyPress2(key) {
    let length = this.telefone.length;

    if(key.replace(/\D+/g, '').length == 0) {
      console.log('nop')
      return;
    }
    if(length == 10){
      this.telefone = `${this.telefone}${key}`;
      this.setMask();
      length = this.telefone.length;
    }
  }

  setMask(event=null){
      if(this.telefone.length <= 10)
      {
        this.telefoneMask = "(00) 0000-0000";
      }
      else
      {
        if(this.telefone.length == 11 && event != null && event.keyCode == 8){
          const tel = this.telefone;
          this.telefoneMask = "(00) 0000-0000";
          this.telefone = tel;
        }
         this.telefoneMask = "(00) 00000-0000";
      }
  }

  /*
  keyPress(key) {
    if(key.replace(/\D+/g, '').length > 0) {
      if(this.myModel1.length >= 10) {
        console.log('numero');
        this.telMask = this.celMask;
      } else {
        this.telMask = this.fixoMask;
      }
    }
  }
   */

  /*
      
$(document).ready(function () {

  var firstMask = "(99) 9999-9999[9]";

  $('.phone-mask').each(function () {
    mask(this);
  });

  $('.phone-mask').on('input propertychange', function () {
    mask(this);
  });

  function mask(input) {
    const length = input.value.length;
    if (length > 8 && length < 15) {
      $('.phone-mask').inputmask({ "mask": firstMask, jitMasking: true });
      return;
    }
    if (length == 15) {
      $('.phone-mask').inputmask({ "mask": "(99) 99999-9999", jitMasking: true });
      return;
    }
  }
});

       */
}
