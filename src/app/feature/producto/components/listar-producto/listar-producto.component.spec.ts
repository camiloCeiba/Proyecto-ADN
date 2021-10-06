import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarProductoComponent } from './listar-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoService } from '../../shared/service/producto.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Libro } from '@core/modelo/producto';
import { GeneralService } from '@shared/services/general.service';

describe('ListarProductoComponent', () => {
  let component: ListarProductoComponent;
  let fixture: ComponentFixture<ListarProductoComponent>;
  let productoService: ProductoService;
  const listaProductos: Libro[] = [new Libro(
                                              'Arsène Lupin - Caballero y Ladrón',
                                              'Blanco&Negro',
                                              // tslint:disable-next-line: max-line-length
                                              'https://images.cdn2.buscalibre.com/fit-in/360x360/96/b9/96b9d711019a6807e4a89495b7089b97.jpg',
                                              'Arsène Lupin es un caballero ladrón ficticio y maestro del disfraz creado en 1905 por el escritor francés Maurice Leblanc. Originalmente se llamaba Arsène Lopin, hasta que un político local del mismo nombreLibro_libro protestó. El personaje apareció por primera vez en una serie de historias cortas serializadas en la revista Je sais tout.',
                                              'Acción',
                                                1905,
                                                'Disponible',
                                                500,
                                                245456,
                                                1
                                              ), new Libro(
                                                'Arsène Lupin - La Aguja Hueca',
                                                'Blanco&Negro',
                                                'https://http2.mlstatic.com/D_NQ_NP_2X_744231-MCO46623946556_072021-F.webp',
                                                'En ésta entrega de la serie del famoso ladrón de guante blanco, empieza con una escena nocturna muy inquietante y ubicación desde el primer momento al lector en un estado de gran tensión, lo que supone una distracción para que el lector pueda aplicar su ingenio a descubrir el verdadero misterio que se plantea, el enigma que llegará a César ocupar la Galia y posteriormente a los normandos iniciarán en Francia su despliegue por Europa. Se trata de una gran mole calcárea frente a la costa que oculta un secreto y, según cuenta la leyenda, un inmenso tesoro.',
                                                'Acción',
                                                1909,
                                                'Disponible',
                                                700,
                                                255742,
                                                2
                                                )];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProductoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ProductoService, HttpService, GeneralService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    spyOn(productoService, 'consultar').and.returnValue(
      of(listaProductos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaProductos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
