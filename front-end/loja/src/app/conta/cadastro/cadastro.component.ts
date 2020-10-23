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
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  mudancasNaoSalvas: boolean;

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
      },
      confirmPassword: {
        required: 'Informa a confirmação de senha',
        rangelength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {

    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]) 

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password,
      confirmPassword
    })
  }

  ngAfterViewInit(): void {
    let controlBlur: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlur).subscribe(() => {
      this.displayMessage = this.genericValidator.MessageProcess(this.cadastroForm);
    })

    this.mudancasNaoSalvas = true;
  }

  adicionarConta() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalhar(falha) }
        )

      this.mudancasNaoSalvas = false;
    }
  }


  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.router.navigate(['/home']);

    this.toastr.success('Cadastrado realizado com sucesso!', 'Seja bem vindo!');

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
