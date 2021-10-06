import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { GeneralService } from '@shared/services/general.service';
import { SELECTORS } from '@shared/util/selectors';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [GeneralService, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion de existencia de elementos', () => {
    const linkCrearLibro = SELECTORS.NAV_BAR.linkCrearLibro();
    const linkPrestamo = SELECTORS.NAV_BAR.linkPrestamo();
    const linkListarLibro = SELECTORS.NAV_BAR.linkListarLibro();
    const linkListaAlquilar = SELECTORS.NAV_BAR.linkListaAlquilar();

    fixture.detectChanges();
    expect(linkCrearLibro?.tagName).toEqual('A');
    expect(linkPrestamo?.tagName).toEqual('A');
    expect(linkListarLibro?.tagName).toEqual('A');
    expect(linkListaAlquilar?.tagName).toEqual('A');
  });
});
