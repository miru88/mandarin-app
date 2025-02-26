import { ComponentFixture, TestBed } from '@angular/core/testing';

import { displayCharactersComponent } from './displayCharacters.component';

describe('CharacterCardComponent', () => {
  let component: displayCharactersComponent;
  let fixture: ComponentFixture<displayCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [displayCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(displayCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
