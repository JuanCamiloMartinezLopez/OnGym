import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAtletaComponent } from './perfil-atleta.component';

describe('PerfilAtletaComponent', () => {
  let component: PerfilAtletaComponent;
  let fixture: ComponentFixture<PerfilAtletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAtletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
