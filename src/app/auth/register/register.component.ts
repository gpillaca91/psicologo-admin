import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public base_url = "http://localhost:3000/api";
  public loginForm = this.fb.group({
    nombre: ['' , [ Validators.required] ],
    email: ['' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
  });
  constructor( private router: Router,
    private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  registrarUsuario() {
    
    this.http.post(`${ this.base_url }/usuarios`, this.loginForm.value )
    .subscribe((resp:any)=>{
      Swal.fire(
        'Acceso Exitoso',
        'Bienvedido!!',
        'success'
      ).then(ok=>this.router.navigateByUrl('/dashboard'));
    });
    
  }

}
