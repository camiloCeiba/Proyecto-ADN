import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationLib } from '@core/modelo/notification';
import { Prestamo } from '@core/modelo/prestamo';
import { Libro, Person } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.sass']
})
export class VerProductoComponent implements OnInit {
  
  @Output() newItemEvent = new EventEmitter<NotificationLib>();
  public producto: Libro;
  public totalPrestamos: Prestamo[] = [];
  public id: number;
  public persona: Person;
  public objNoti: NotificationLib;

  constructor(protected generalService: GeneralService, private route: ActivatedRoute, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
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
    this.objNoti = {titulo:'', descripcion: '', tipo: ''};
  }

  async ngOnInit() {
    this.producto = await this.generalService.consultarId(this.id);
    this.persona = this.generalService.getToken();
    this.autorizarAlquilar();
  }

  alquiler(item: Libro) {
    const valor = 2;
    if (this.totalPrestamos.length === valor) {
      this.objNoti.titulo='Warning';
      this.objNoti.descripcion='No puedes reservar debido a que tienes 2 libros ya alquilados';
      this.objNoti.tipo='warning';
      // setTimeout(()=>{this.objNoti = {titulo:'', descripcion: '', tipo: ''}},500);
      return false;
    }else{
      if (item.estado === 'Disponible') {
        this.routerVerProducto(item.id);
        return true;
      } else {
        this.objNoti.titulo='Warning';
        this.objNoti.descripcion='El libro no se encuentra disponible para el alquiler';
        this.objNoti.tipo='warning';
        // setTimeout(()=>{this.objNoti = {titulo:'', descripcion: '', tipo: ''}},500);
        return false;
      }
    }

  }

  public routerVerProducto(id: number): void {
    this.router.navigateByUrl('alquiler/alquiler-libro/' + id);
  }


  async autorizarAlquilar() {
    const getTotalPrestamos: Prestamo[] = await this.generalService.consultarPrestamos();
    this.totalPrestamos = getTotalPrestamos.filter(element => element.cedula === this.persona.cedula && element.estado === 'pendiente');
  }

}
