/* tslint:disable:no-unused-variable */
import { AlquilerService } from '@alquiler//shared/service/alquiler.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { GeneralService } from '@shared/services/general.service';

import { AlquilerLibroComponent } from './alquiler-libro.component';

describe('AlquilerLibroComponent', () => {
  let component: AlquilerLibroComponent;
  let fixture: ComponentFixture<AlquilerLibroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilerLibroComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [GeneralService, AlquilerService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquilerLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
