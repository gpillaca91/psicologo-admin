import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Medico } from '../models/medico.model';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public base_url = 'http://localhost:3000/api';
  public totalmedicos: number = 0;
  public medicos: Medico[] = [];
  public ocultarModal: boolean = true;
  public acccion: string = 'Guardar';
  public uid:string =''
  public medicoForm = this.fb.group({
    nombres: ['',Validators.required],
    paterno: ['',Validators.required],
    materno: ['',Validators.required],
    id_tipdoc: ['',Validators.required],
    nro_doc: ['',Validators.required],
    fec_nac: ['',Validators.required],
    celular: ['',Validators.required],
    sexo: ['',Validators.required],
    ruc: ['',Validators.required],
    tipoColegiatura: ['',Validators.required],
    nroColegiatura: ['',Validators.required],
    rne: ['',Validators.required],
    direccion: ['',Validators.required],
    departamento: ['',Validators.required],
    provincia: ['',Validators.required],
    distrito: ['',Validators.required],
    modContrato: ['',Validators.required],
    area: ['',Validators.required],
    cargo: ['',Validators.required],
    enActividad: ['',Validators.required],
    usuario: ['',Validators.required],
    hospital: ['',Validators.required],
    email: ['' , [ Validators.required, Validators.email ] ],
  });
  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }
  cargarMedicos(desde: number = 0) {
    const url = `${this.base_url}/medicos?desde=${desde}`;
    this.http.get(url).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalmedicos = resp.total;
    });
  }

  borrar(p: Medico) {
    
    const url = `${this.base_url}/medicos/${p._id}`;
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ p.nombres }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
       
        this.http.delete(url).subscribe(
          (resp:any)=>{
            this.cargarMedicos();
            Swal.fire(
              'Usuario borrado',
              `${ p.nombres } fue eliminado correctamente`,
              'success'
            );
          }
        )

      }
    })
 
  }


  abrirModal(medico:any=null) {
    this.ocultarModal = false;
    if (medico != null) {
      this.uid = medico._id;
      this.acccion='Actualizar';
      const {
        nombres,
        paterno,
        materno,
        id_tipdoc,
        nro_doc,
        fec_nac,
        celular,
        sexo,
        ruc,
        tipoColegiatura,
        nroColegiatura,
        rne,
        direccion,
        departamento,
        provincia,
        distrito,
        modContrato,
        area,
        cargo,
        enActividad,
        email,
      } = medico;
      this.medicoForm.setValue({
        hospital: '6316e57e21f65859489a966c',
        nombres,
        paterno,
        materno,
        id_tipdoc,
        nro_doc,
        fec_nac,
        celular,
        sexo,
        ruc,
        tipoColegiatura,
        nroColegiatura,
        rne,
        direccion,
        departamento,
        provincia,
        distrito,
        modContrato,
        area,
        cargo,
        enActividad,
        usuario: '6316e9c9bf99668cac7289c9',
        email
      });
      
    } else {
      
      this.acccion='Guardar';
      this.medicoForm.setValue({
        nombres: null,
        paterno: null,
        materno: null,
        id_tipdoc: null,
        nro_doc: null,
        fec_nac: null,
        celular: null,
        sexo: null,
        ruc: null,
        tipoColegiatura: null,
        nroColegiatura: null,
        rne: null,
        direccion: null,
        departamento: null,
        provincia: null,
        distrito: null,
        modContrato: null,
        area: null,
        cargo: null,
        enActividad: null,
        usuario: '6316e9c9bf99668cac7289c9',
        hospital: '6316e57e21f65859489a966c',
        email: null
      });
    }

  }
    
 
    saveMedico(){
      const url = `${this.base_url}/medicos`;
      
      if (this.acccion =='Guardar') {
        this.http.post(url,this.medicoForm.value).subscribe((resp: any) => {
          
          this.cargarMedicos();
          Swal.fire(
            'Medico Creado',
            `${this.medicoForm.value.nombres} fue registrado correctamente`,
            'success'
            );
          this.cerrarModal();
        });
      } else {
        const url = `${this.base_url}/medicos/${this.uid}`;
        this.http.put(url,this.medicoForm.value).subscribe((resp)=>{
          this.cargarMedicos();
          Swal.fire(
            'Medico Actualizado',
            `${this.medicoForm.value.nombres} fue Actualizado correctamente`,
            'success'
          );
          this.cerrarModal()
          
        });
  
      }
    }
    cerrarModal() {
      this.ocultarModal = true;
    }
  }

