import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '@core/modelo/login-item';
import { GeneralService } from '@shared/services/general.service';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  public formLogin: FormGroup;
  public msjErrorUser:string="";
  public msjErrorPass:string="";
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private generalService: GeneralService
    ) {
    this.formLogin = this.formBuilder.group({
      loginUser: [null, Validators.compose([Validators.required])],
      loginPassword: [null, Validators.compose([Validators.required, Validators.minLength(9)])]
    })
  }

  ngOnInit(): void {
  }

  public async login(validacion){
    let token:login;
    if(validacion){
      let body={
        username: this.formLogin.get("loginUser").value,
        password: this.formLogin.get("loginPassword").value
      }
      try {
        token = await this.loginService.login(body);
        this.generalService.setToken(token.token);
        this.redirigir();
      } catch (error) {
        console.log(error);
      }
  
    }else{
      this.formLogin.markAllAsTouched();
      return
    }
  }

  public redirigir():void{
    this.router.navigateByUrl('/producto/listar')
  }

  get loginUserValidate(){
    if(this.formLogin.get('loginUser').hasError('required')){
      this.msjErrorUser="Username es requerido"
    }
    return(
      this.formLogin.get('loginUser').invalid &&
      (this.formLogin.get('loginUser').touched ||
      this.formLogin.get('loginUser').dirty)
    )
  }

  get loginPasswordValidate(){
    if(this.formLogin.get('loginPassword').hasError('required')){
      this.msjErrorPass="Password es requerido"
    }else if(this.formLogin.get('loginPassword').hasError('minlength')){
      this.msjErrorPass="La cantidad de caracteres debe ser minimo 9"
    }

    return(
      this.formLogin.get('loginPassword').invalid &&
      (this.formLogin.get('loginPassword').touched ||
      this.formLogin.get('loginPassword').dirty)
    )
  }


}
