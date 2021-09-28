import { Injectable } from '@angular/core';
import { login } from '@core/modelo/login-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor() { }

public login(body): Promise<login>{
  return new Promise (async (resolve, reject) => {
    let res= await fetch(environment.API+"/login_admin");
    let posts = await res.json();
    if(body.username==posts[0].user && body.password==posts[0].clave){
      resolve(posts[0]);
    }else{
      reject('Usuario o contraseña');
    }
  });
}

}
