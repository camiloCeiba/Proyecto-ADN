import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

constructor() { }

setToken(token){
  try{
    return localStorage.setItem('token', token);
  }catch(error){
    localStorage.clear();
  }
}

getToken(){
  try{
    return localStorage.getItem('token');
  }catch(error){
    localStorage.clear();
  }
}

}
