import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeleteComponent } from './perfil-delete.component';

describe('PerfilDeleteComponent', () => {
  let component: PerfilDeleteComponent;
  let fixture: ComponentFixture<PerfilDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
