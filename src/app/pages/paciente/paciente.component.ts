import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: [],
})
export class PacienteComponent implements OnInit {
  public base_url = 'http://localhost:3000/api';
  public totalpacientes: number = 0;
  public pacientes: Paciente[] = [];
  public ocultarModal: boolean = true;
  public acccion: string = 'Guardar';
  public uid:string =''
  public pacienteForm = this.fb.group({
    nombres: ['', Validators.required],
    paterno: ['', Validators.required],
    materno: ['', Validators.required],
    fec_nac: ['', Validators.required],
    tipocliente: ['', Validators.required],
    nro_historia: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    celular: ['', Validators.required],
    sexo: ['', Validators.required],
    id_tipdoc: ['', Validators.required],
    nro_doc: ['', Validators.required],
    hospital: ['6316e57e21f65859489a966c', Validators.required],
  });
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }
  cargarPacientes(desde: number = 0) {
    const url = `${this.base_url}/pacientes?desde=${desde}`;
    this.http.get(url).subscribe((resp: any) => {
      this.pacientes = resp.pacientes;
      this.totalpacientes = resp.total;
    });
  }

  borrar(p: Paciente) {
    const url = `${this.base_url}/pacientes/${p._id}`;
    Swal.fire({
      title: 'Â¿Borrar usuario?',
      text: `Esta a punto de borrar a ${p.nombres}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.http.delete(url).subscribe((resp: any) => {
          this.cargarPacientes();
          Swal.fire(
            'Usuario borrado',
            `${p.nombres} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }


  abrirModal(paciente:any= null) {
    this.ocultarModal = false;
    if (paciente != null) {
      this.uid = paciente._id;
      this.acccion='Actualizar';
      const {
        nombres,
        paterno,
        materno,
        fec_nac,
        tipocliente,
        nro_historia,
        email,
        direccion,
        celular,
        sexo,
        id_tipdoc,
        nro_doc
      } = paciente;
      this.pacienteForm.setValue({
        nombres,
        paterno,
        materno,
        fec_nac,
        tipocliente,
        nro_historia,
        email,
        direccion,
        celular,
        sexo,
        id_tipdoc,
        nro_doc,
        hospital: '6316e57e21f65859489a966c'
      });
      
    } else {
      
      this.acccion='Guardar';
      this.pacienteForm.setValue({
        
        nombres: null,
        paterno: null,
        materno: null,
        fec_nac: null,
        tipocliente: null,
        nro_historia: null,
        email: null,
        direccion: null,
        celular: null,
        sexo: null,
        id_tipdoc: null,
        nro_doc: null,
        hospital:'6316e57e21f65859489a966c'
      });
    }

    // localhost:3000/api/upload/medicos/no-img
  }
  savePaciente() {
    let hospital ='6316e57e21f65859489a966c';
    const url = `${this.base_url}/pacientes`;
    
    if (this.acccion =='Guardar') {
      this.http.post(url,this.pacienteForm.value).subscribe((resp: any) => {
        
        this.cargarPacientes();
        Swal.fire(
          'Paciente Creado',
          `${this.pacienteForm.value.nombres} fue registrado correctamente`,
          'success'
          );
        this.cerrarModal();
      });
    } else {
      const url = `${this.base_url}/pacientes/${this.uid}`;
      this.http.put(url,this.pacienteForm.value).subscribe((resp)=>{
        this.cargarPacientes();
        Swal.fire(
          'Paciente Actualizado',
          `${this.pacienteForm.value.nombres} fue Actualizado correctamente`,
          'success'
        );
        this.cerrarModal()
        
      })
      
      
    // Swal.fire({
    //   title: '¿Guardar cambios?',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si, Registrar',
    // }).then((result) => {
    //   if (result.value) {
    //     this.http.post(url,p).subscribe((resp: any) => {
    //       this.cargarPacientes();
    //       Swal.fire(
    //         'Usuario borrado',
    //         `${p.value.nombres} fue registrado correctamente`,
    //         'success'
    //       );
    //     });
    //   }
    // });
    }
  }
  cerrarModal() {
    this.ocultarModal = true;
  }
}
