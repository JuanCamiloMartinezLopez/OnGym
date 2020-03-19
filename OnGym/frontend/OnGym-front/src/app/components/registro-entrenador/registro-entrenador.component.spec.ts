import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntrenadorComponent } from './registro-entrenador.component';

describe('RegistroEntrenadorComponent', () => {
  let component: RegistroEntrenadorComponent;
  let fixture: ComponentFixture<RegistroEntrenadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEntrenadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
