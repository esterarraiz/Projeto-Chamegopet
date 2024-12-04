import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasDivulgacoesPage } from './minhas-divulgacoes.page';
import { HttpClientModule } from '@angular/common/http';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }).compileComponents();
});

describe('MinhasDivulgacoesPage', () => {
  let component: MinhasDivulgacoesPage;
  let fixture: ComponentFixture<MinhasDivulgacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasDivulgacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
