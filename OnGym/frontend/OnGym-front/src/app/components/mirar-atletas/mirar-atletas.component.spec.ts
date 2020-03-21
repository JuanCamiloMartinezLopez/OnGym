import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirarAtletasComponent } from './mirar-atletas.component';

describe('MirarAtletasComponent', () => {
  let component: MirarAtletasComponent;
  let fixture: ComponentFixture<MirarAtletasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirarAtletasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirarAtletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
