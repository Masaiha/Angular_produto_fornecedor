import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ngx-custom-validators';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit { 
  
@ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

errors: any[] = [];
loginForm: FormGroup;
usuario: Usuario;

validationMessages: ValidationMessages;
genericValidator: GenericValidator;
displayMessage: DisplayMessage = {};

constructor(private fb: FormBuilder,
            private contaService: ContaService,
            private router: Router,
            private toastr: ToastrService) {

  this.validationMessages = {
    email: {
      required: 'Informe o e-mail',
      email: 'E-mail inválido'
    },
    password: {
      required: 'Informa a senha',
      rangelength: 'A senha deve possuir entre 6 e 15 caracteres'
    }
  }

  this.genericValidator = new GenericValidator(this.validationMessages);

}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
  })
}

ngAfterViewInit(): void {
  let controlBlur: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

  merge(...controlBlur).subscribe(() => {
    this.displayMessage = this.genericValidator.MessageProcess(this.loginForm);
  })

}

login() {
  if(this.loginForm.dirty && this.loginForm.valid){
    this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

    this.contaService.login(this.usuario)
      .subscribe(
        sucesso => { this.processarSucesso(sucesso) },
        falha => { this.processarFalhar(falha) }
      )

  }
}


processarSucesso(response: any) {
  this.loginForm.reset();
  this.errors = [];

  this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

  this.router.navigate(['/home']);

  this.toastr.success('Login realizado com sucesso!', 'Seja bem vindo!');

  // let toastr = this.toastr.success('Cadastrado realizado com sucesso!', 'Seja bem vindo!');
  
  // toastr.onHidden.subscribe(() => {
  //   this.router.navigate(['/home']);
  // })

}

processarFalhar(fail: any) {
  this.errors = fail.error.errors;
  this.toastr.error('Ocorreu um erro', 'Ops! :(');
}

}
