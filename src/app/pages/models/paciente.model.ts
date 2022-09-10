
export class Paciente {

    constructor(
        public nombres: string,
        public paterno: string,
        public materno: string,
        public email: string,
        public direccion: string,
        public id_tipdoc: string,
        public nro_doc: string,
        public fec_nac: string,
        public celular: string,
        public sexo: string,
        public nro_historia: string,
        public tipocliente: string,
        public hospital: string,
        public _id?: string
    ) {}


}