import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVocabularyListComponentComponent } from './admin-vocabulary-list-component.component';

describe('AdminVocabularyListComponentComponent', () => {
  let component: AdminVocabularyListComponentComponent;
  let fixture: ComponentFixture<AdminVocabularyListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVocabularyListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVocabularyListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
