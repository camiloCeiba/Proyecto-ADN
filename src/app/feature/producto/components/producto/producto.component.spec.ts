import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponent } from './producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SELECTORS } from '@shared/util/selectors';


describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion de existencia de elementos', ()=>{
    const linkCrearLibro = SELECTORS.NAV_BAR.linkCrearLibro();
    const linkBorrarLibro = SELECTORS.NAV_BAR.linkBorrarLibro();
    const linkListarLibro = SELECTORS.NAV_BAR.linkListarLibro();

    fixture.detectChanges();
    
    expect(linkCrearLibro?.tagName).toEqual('A')
    expect(linkBorrarLibro?.tagName).toEqual('A')
    expect(linkListarLibro?.tagName).toEqual('A')
  });

});
