import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoDeleteComponent } from './ponto-delete.component';

describe('PontoDeleteComponent', () => {
  let component: PontoDeleteComponent;
  let fixture: ComponentFixture<PontoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PontoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
