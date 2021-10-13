import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create NotificationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia devolver un warning', () => {
    expect(component.getColor('warning')).toEqual('#ddf231cf');
  });

  it('Deberia devolver un success', () => {
    expect(component.getColor('success')).toEqual('#31f290cf');
  });

  it('Deberia devolver un danger', () => {
    expect(component.getColor('danger')).toEqual('#f45858');
  });
});
