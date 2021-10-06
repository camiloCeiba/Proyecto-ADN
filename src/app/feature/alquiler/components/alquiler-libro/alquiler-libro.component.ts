import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';
import { AlquilerService } from '../../shared/service/alquiler.service';
import * as moment from 'moment';

@Component({
  selector: 'app-alquiler-libro',
  templateUrl: './alquiler-libro.component.html',
  styleUrls: ['./alquiler-libro.component.sass']
})
export class AlquilerLibroComponent implements OnInit {
  alquilerForm: FormGroup;
  public prestamo: boolean;
  public updateEstado: Libro;
  public producto: Libro;
  public id: number;
  public persona: Person;

  constructor(protected generalService: GeneralService,
              private route: ActivatedRoute,
              private alquilerService: AlquilerService,
              private router: Router
              ) {
    this.id = parseInt( this.route.snapshot.paramMap.get('id'), 0);
    this.persona = {
      nombrePersona: '',
      cedula: null,
      rol: '',
      user: ''
    };
  }

  async ngOnInit() {
    this.persona = this.generalService.getToken();
    this.construirFormularioProducto();
    this.producto = await this.generalService.consultarId(this.id);
    this.alquilerForm.get('codigoLibro').setValue(this.producto.id);
    this.cambiosFecha();
  }

  private construirFormularioProducto() {
    this.alquilerForm = new FormGroup({
      id: new FormControl(''),
      nombrePersona: new FormControl({ value: this.persona.nombrePersona, disabled: false }),
      cedula: new FormControl({ value: this.persona.cedula, disabled: false }),
      fechaAlquiler: new FormControl('', [Validators.required]),
      fechaDevolucion: new FormControl('', [Validators.required]),
      valorTotal: new FormControl({ value: '', disabled: false }, [Validators.required]),
      codigoLibro: new FormControl({ value: '', disabled: false }),
      estado: new FormControl({ value: 'pendiente', disabled: false }),
    });
  }

  getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  public async crear(validacion) {
    if (validacion) {
      this.alquilerForm.get('id').setValue(this.getRandomId(99));
      this.prestamo = await this.alquilerService.crear(this.alquilerForm.value);
      this.producto.estado = 'Ocupado';
      this.updateEstado = await this.alquilerService.actualizar(this.producto);
      this.redirigir();
    } else {
      this.alquilerForm.markAllAsTouched();
      return false;
    }
  }
  public redirigir(): void {
    this.router.navigateByUrl('/alquiler/lista-alquiler');
  }

  cambiosFecha() {
    let fechaInicial;
    let fechaFinal;
    this.alquilerForm.get('fechaAlquiler').valueChanges.subscribe(fechaI => {
      fechaInicial = moment(fechaI);
      if (fechaInicial.day() === 0 ){
        alert('Los dias domingos no se pueden reservar libros');
        this.alquilerForm.get('valorTotal').setValue(undefined);
        return;
      }
      this.calcularValor(fechaInicial, fechaFinal);
    });

    this.alquilerForm.get('fechaDevolucion').valueChanges.subscribe(fechaF => {
      fechaFinal = moment(fechaF);
      this.calcularValor(fechaInicial, fechaFinal);
    });
  }

  calcularValor(fechaInicial, fechaFinal){
    if (fechaInicial !== undefined && fechaFinal !== undefined){
      if (fechaFinal.diff(fechaInicial, 'days') > 0){
        this.alquilerForm.get('valorTotal').setValue(fechaFinal.diff(fechaInicial, 'days') * this.producto.valorDia);
      }else{
        alert('La fecha final no puede ser menor a la fecha inicial');
      }
    }
  }
}
