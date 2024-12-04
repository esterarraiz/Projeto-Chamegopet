import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetDetailPage } from './pet-detail.page';
import { HttpClientModule } from '@angular/common/http';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }).compileComponents();
});

describe('PetDetailPage', () => {
  let component: PetDetailPage;
  let fixture: ComponentFixture<PetDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
