import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutenticacaoPage } from './autenticacao.page';
import { HttpClientModule } from '@angular/common/http';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }).compileComponents();
});

describe('AutenticacaoPage', () => {
  let component: AutenticacaoPage;
  let fixture: ComponentFixture<AutenticacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
