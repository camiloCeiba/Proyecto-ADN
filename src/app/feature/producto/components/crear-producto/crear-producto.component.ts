import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.sass']
})
export class CrearProductoComponent implements OnInit {
  libroForm: FormGroup;
  constructor(protected productoServices: ProductoService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear(validacion) {
    debugger
    if(validacion){
      this.productoServices.crear(this.libroForm.value);
    }else{
      this.libroForm.markAllAsTouched();
      return
    }
  }

  private construirFormularioProducto() {
    this.libroForm = new FormGroup({
      nombre_libro: new FormControl('', [Validators.required]),
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

}
