import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit {
  public base_url = 'http://localhost:3000/api';
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public ocultarModal: boolean = true;
  public acccion : string ='';

  public loginForm = this.fb.group({
    nombre: ['' , [ Validators.required] ],
    email: ['' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
  });
  constructor(private fb: FormBuilder,private http: HttpClient) { }
  

  ngOnInit(): void {
    this.cargarUsuarios();
    
  }
  cargarUsuarios(desde: number = 0) {
    const url = `${this.base_url}/usuarios?desde=${desde}`;
    this.http.get(url).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalUsuarios = resp.total;
    });
  }

  borrar(usuario: any) {
    const url = `${this.base_url}/usuarios/${usuario.uid}`;
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
       
        this.http.delete(url).subscribe(
          (resp:any)=>{
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );
          }
        )

      }
    })
 
  }
  crearUsuario(){
    this.acccion = 'Crear';
  }
  editarUsuario(){
    this.acccion = 'Actualizar';
  }

  abrirModal(usuario:any = null) {
    this.ocultarModal = false;
    if (usuario!=null){
      let {nombre,email,password} = usuario;
      password=''
      this.loginForm.setValue({nombre,email,password});
    }else {
    this.loginForm.setValue({
      nombre: null,
      email: null,
      password: null
    });
  }
    
    
    
    // localhost:3000/api/upload/medicos/no-img
  }

  cerrarModal() {
    this.ocultarModal = true;
  }
}
