import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSesion, TypeLogin } from '../../shared/model/login';
import { LoginService } from '../../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public msjErrorUser: string;
  public msjErrorPass: string;
  public msjErrortype: string;
  public datosPersona: LoginSesion[];
  public listType: TypeLogin[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.listType = [{ name: 'Administrador', idName: 'login_admin' }, { name: 'Usuario', idName: 'login_user' }];
    this.formLogin = this.formBuilder.group({
      loginUser: [null, Validators.compose([Validators.required])],
      loginPassword: [null, Validators.compose([Validators.required, Validators.minLength(9)])],
      type: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.msjErrorUser = '';
    this.msjErrorPass = '';
    this.msjErrortype = '';
  }

  async login(validacion) {
    if (validacion) {
      this.datosPersona = await this.loginService.login(this.formLogin.get('type').value);
      if (this.formLogin.get('loginUser').value === this.datosPersona[0].user &&
        this.formLogin.get('loginPassword').value === this.datosPersona[0].clave) {
        localStorage.setItem('token', this.datosPersona[0].token);
        this.redirigir();
      } else {
        alert('Usuario o contraseña incorrecta');
      }
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  public redirigir(): void {
    this.router.navigate(['/producto/listar']);
  }

  get loginUserValidate() {
    if (this.formLogin.get('loginUser').hasError('required')) {
      this.msjErrorUser = 'Username es requerido';
    }
    return (
      this.formLogin.get('loginUser').invalid &&
      (this.formLogin.get('loginUser').touched ||
        this.formLogin.get('loginUser').dirty)
    );
  }

  get loginPasswordValidate() {
    if (this.formLogin.get('loginPassword').hasError('required')) {
      this.msjErrorPass = 'Password es requerido';
    } else if (this.formLogin.get('loginPassword').hasError('minlength')) {
      this.msjErrorPass = 'La cantidad de caracteres debe ser minimo 9';
    }

    return (
      this.formLogin.get('loginPassword').invalid &&
      (this.formLogin.get('loginPassword').touched ||
        this.formLogin.get('loginPassword').dirty)
    );
  }

  get loginTypeValidate() {
    if (this.formLogin.get('type').hasError('required')) {
      this.msjErrortype = 'El tipo es requerido';
    }

    return (
      this.formLogin.get('type').invalid &&
      (this.formLogin.get('type').touched ||
        this.formLogin.get('type').dirty)
    );
  }
}
