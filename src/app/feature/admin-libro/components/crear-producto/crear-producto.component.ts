import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Libro } from '@core/modelo/producto';
import { LibroService } from '../../shared/service/libro.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.sass']
})
export class CrearProductoComponent implements OnInit {
  libroForm: FormGroup;
  public producto: Libro;
  constructor(protected libroService: LibroService, private router: Router) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  public async crear(validacion) {
    if (validacion){
      const numbera = 99;
      this.libroForm.get('id').setValue(this.getRandomId(numbera));
      this.producto = await this.libroService.crear(this.libroForm.value);
      this.redirigir();
    }
  }

  private construirFormularioProducto() {
    this.libroForm = new FormGroup({
      id: new FormControl(''),
      nombreLibro: new FormControl('', [Validators.required]),
      editorial: new FormControl('', [Validators.required]),
      URL: new FormControl('', [Validators.required]),
      resumen: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      fechaPublicacion: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      valorDia: new FormControl('', [Validators.required]),
      codigoLibro: new FormControl('', [Validators.required]),
    });
  }

  getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  public redirigir(): void {
    this.router.navigateByUrl('/producto/listar');
  }

}
