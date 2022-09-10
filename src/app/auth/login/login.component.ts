import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AccesoService } from '../../services/acceso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public base_url = "http://localhost:3000/api";
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
  });
  constructor( private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private accesoService:AccesoService) { }
  ngOnInit(): void {
  }
  
  login() {
    const {email,password} = this.loginForm.value;
    this.accesoService.login({email:email,password:password}).subscribe((resp:any)=>{
      Swal.fire(
        'Acceso Exitoso',
        'Bienvedido!!',
        'success'
      )
      this.router.navigateByUrl('/dashboard');
    });

  }

}
