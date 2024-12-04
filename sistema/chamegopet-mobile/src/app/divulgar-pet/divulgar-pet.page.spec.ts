import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DivulgarPetPage } from './divulgar-pet.page';

describe('DivulgarPetPage', () => {
  let component: DivulgarPetPage;
  let fixture: ComponentFixture<DivulgarPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DivulgarPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
