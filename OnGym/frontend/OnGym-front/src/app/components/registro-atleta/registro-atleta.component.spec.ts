import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAtletaComponent } from './registro-atleta.component';

describe('RegistroAtletaComponent', () => {
  let component: RegistroAtletaComponent;
  let fixture: ComponentFixture<RegistroAtletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAtletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
