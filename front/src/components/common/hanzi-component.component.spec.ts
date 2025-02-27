import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanziComponentComponent } from './hanzi-component.component';

describe('HanziComponentComponent', () => {
  let component: HanziComponentComponent;
  let fixture: ComponentFixture<HanziComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HanziComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HanziComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
