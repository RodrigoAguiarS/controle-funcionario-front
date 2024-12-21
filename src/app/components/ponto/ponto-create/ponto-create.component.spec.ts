import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoCreateComponent } from './ponto-create.component';

describe('PontoCreateComponent', () => {
  let component: PontoCreateComponent;
  let fixture: ComponentFixture<PontoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PontoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
