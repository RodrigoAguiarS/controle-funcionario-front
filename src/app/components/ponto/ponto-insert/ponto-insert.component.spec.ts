import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoInsertComponent } from './ponto-insert.component';

describe('PontoInsertComponent', () => {
  let component: PontoInsertComponent;
  let fixture: ComponentFixture<PontoInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PontoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
