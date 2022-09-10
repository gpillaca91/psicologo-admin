import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private token:string= '';
  public base_url = "http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  login(user:{email:any,password:any}){
    
    return this.http.post(`${ this.base_url }/login`, user ).pipe(
      map((data: any) => {
      
        this.token = data.token;
        return data.token;
      }
    ));
  }
  existeSession():boolean{
    if (this.token.length >0){
      return true
    } else {
    
    return false;
    }
  }
}
