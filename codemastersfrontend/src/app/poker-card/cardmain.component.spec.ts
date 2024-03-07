import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmainComponent } from './cardmain.component';

describe('CardmainComponent', () => {
  let component: CardmainComponent;
  let fixture: ComponentFixture<CardmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
