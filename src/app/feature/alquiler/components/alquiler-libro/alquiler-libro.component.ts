import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationLib } from '@core/modelo/notification';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';
import { AlquilerService } from '../../shared/service/alquiler.service';

@Component({
  selector: 'app-alquiler-libro',
  templateUrl: './alquiler-libro.component.html',
  styleUrls: ['./alquiler-libro.component.sass']
})
export class AlquilerLibroComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<NotificationLib>();
  alquilerForm: FormGroup;
  public prestamo: Prestamo;
  public updateEstado: Libro;
  public producto: Libro;
  public id: number;
  public persona: Person;
  public objNoti: NotificationLib;

  constructor(
    protected generalService: GeneralService,
    private route: ActivatedRoute,
    private alquilerService: AlquilerService,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.alquilerForm = new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      fechaAlquiler: new FormControl('', [Validators.required]),
      fechaDevolucion: new FormControl('', [Validators.required]),
      valorTotal: new FormControl({ value: '', disabled: false }, [Validators.required]),
      codigoLibro: new FormControl({ value: '', disabled: false }),
      estado: new FormControl({ value: 'pendiente', disabled: false }),
    });
    this.objNoti = { titulo: '', descripcion: '', tipo: '' };
  }

  async ngOnInit() {
    this.persona = {
      nombrePersona: '',
      cedula: 1,
      rol: '',
      user: ''
    };
    this.producto = {
      nombreLibro: '',
      id: null,
      editorial: '',
      resumen: '',
      categoria: '',
      URL: '',
      estado: '',
      fechaPublicacion: null,
      valorDia: null
    };
    this.getLibro();
    this.cambiosFecha();
  }

  getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  public async getLibro() {
    this.producto = await this.generalService.consultarId(this.id);
    this.alquilerForm.get('codigoLibro').setValue(this.producto.id);
  }

  public async crear(validacion) {
    if (validacion) {
      const numbera = 99;
      this.alquilerForm.get('id').setValue(this.getRandomId(numbera));
      this.prestamo = await this.alquilerService.crear(this.alquilerForm.value);
      this.actualizarEstadoLibro();
      return true;
    } else {
      this.alquilerForm.markAllAsTouched();
      return false;
    }
  }
  public async actualizarEstadoLibro() {
    this.producto.estado = 'Ocupado';
    this.updateEstado = await this.alquilerService.actualizar(this.producto);
    this.redirigir();
  }

  public redirigir(): void {
    this.router.navigateByUrl('/alquiler/lista-alquiler');
  }

  cambiosFecha() {
    let fechaInicial;
    let fechaFinal;
    this.alquilerForm.get('fechaAlquiler').valueChanges.subscribe((fechaI: Date) => {
      fechaInicial = new Date(fechaI);
      const diaDomingo = 6;

      if (fechaInicial.getDay() === diaDomingo) {
        this.objNoti.titulo = 'Warning';
        this.objNoti.descripcion = `Los dias domingos no se pueden reservar libros`;
        this.objNoti.tipo = 'warning';
        this.alquilerForm.get('valorTotal').setValue(undefined);
        return false;
      } else {
        this.calcularValor(fechaInicial, fechaFinal);
        return true;
      }
    });

    this.alquilerForm.get('fechaDevolucion').valueChanges.subscribe(fechaF => {
      fechaFinal = new Date(fechaF);
      this.calcularValor(fechaInicial, fechaFinal);
      return true;
    });
  }

  calcularValor(fechaInicial: Date, fechaFinal: Date): void {
    if (fechaInicial !== undefined && fechaFinal !== undefined) {
      const mes = 1000;
      const minutos = 60;
      const segundos = 60;
      const horas = 24;
      if ((fechaFinal.getTime() - fechaInicial.getTime()) / (mes * minutos * segundos * horas) > 0) {
        this.alquilerForm.get('valorTotal').setValue(
          (fechaFinal.getTime() - fechaInicial.getTime()) / (mes * minutos * segundos * horas) * this.producto.valorDia);
      } else {
        this.objNoti.titulo = 'Warning';
        this.objNoti.descripcion = 'La fecha final no puede ser menor a la fecha inicial';
        this.objNoti.tipo = 'warning';
      }
    }
  }
}
