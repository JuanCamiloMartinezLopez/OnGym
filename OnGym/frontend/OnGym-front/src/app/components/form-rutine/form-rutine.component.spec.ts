import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRutineComponent } from './form-rutine.component';

describe('FormRutineComponent', () => {
  let component: FormRutineComponent;
  let fixture: ComponentFixture<FormRutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
