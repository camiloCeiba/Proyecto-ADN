import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  alquilerForm: FormGroup;
  public prestamo: Prestamo;
  public updateEstado: Libro;
  public producto: Libro;
  public id: number;
  public persona: Person;

  constructor(
    protected generalService: GeneralService,
    private route: ActivatedRoute,
    private alquilerService: AlquilerService,
    private router: Router
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.alquilerForm = new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl({ value: '', disabled: false }),
      fechaAlquiler: new FormControl('', [Validators.required]),
      fechaDevolucion: new FormControl('', [Validators.required]),
      valorTotal: new FormControl({ value: '', disabled: false }, [Validators.required]),
      codigoLibro: new FormControl({ value: '', disabled: false }),
      estado: new FormControl({ value: 'pendiente', disabled: false }),
    });
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
      valorDia: null,
      codigoLibro: null
    };
    // this.getPersona();
    this.getLibro();
    this.cambiosFecha();
  }

  getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  public getPersona() {
    this.persona = this.generalService.getToken();
    this.alquilerForm.get('cedula').setValue(this.persona.cedula);
  }

  public async getLibro() {
    this.producto = await this.generalService.consultarId(this.id);
    this.alquilerForm.get('codigoLibro').setValue(this.producto.id);
  }

  public async crear(validacion) {
    if (validacion) {
      this.alquilerForm.get('id').setValue(this.getRandomId(99));
      this.prestamo = await this.alquilerService.crear(this.alquilerForm.value);
      this.actualizarEstadoLibro();
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
      if (fechaInicial.getDay() === 6) {
        alert('Los dias domingos no se pueden reservar libros');
        this.alquilerForm.get('valorTotal').setValue(undefined);
        return false;
      } else {
        this.calcularValor(fechaInicial, fechaFinal);
      }
    });

    this.alquilerForm.get('fechaDevolucion').valueChanges.subscribe(fechaF => {
      fechaFinal = new Date(fechaF);
      this.calcularValor(fechaInicial, fechaFinal);
    });
  }

  calcularValor(fechaInicial: Date, fechaFinal: Date): void {
    if (fechaInicial !== undefined && fechaFinal !== undefined) {
      if ((fechaFinal.getTime() - fechaInicial.getTime()) / (1000 * 60 * 60 * 24) > 0) {
        this.alquilerForm.get('valorTotal').setValue(
          (fechaFinal.getTime() - fechaInicial.getTime()) / (1000 * 60 * 60 * 24) * this.producto.valorDia);
      } else {
        alert('La fecha final no puede ser menor a la fecha inicial');
      }
    }
  }
}
