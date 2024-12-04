import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDivulgacaoPage } from './editar-divulgacao.page';
import { HttpClientModule } from '@angular/common/http';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }).compileComponents();
});

describe('EditarDivulgacaoPage', () => {
  let component: EditarDivulgacaoPage;
  let fixture: ComponentFixture<EditarDivulgacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDivulgacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
