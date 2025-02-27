import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVocabularyDetailComponentComponent } from './admin-vocabulary-detail-component.component';

describe('AdminVocabularyDetailComponentComponent', () => {
  let component: AdminVocabularyDetailComponentComponent;
  let fixture: ComponentFixture<AdminVocabularyDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVocabularyDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVocabularyDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
