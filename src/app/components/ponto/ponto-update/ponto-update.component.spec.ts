import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoUpdateComponent } from './ponto-update.component';

describe('PontoUpdateComponent', () => {
  let component: PontoUpdateComponent;
  let fixture: ComponentFixture<PontoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PontoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
