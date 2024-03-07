import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardshowComponent } from './cardshow.component';

describe('CardshowComponent', () => {
  let component: CardshowComponent;
  let fixture: ComponentFixture<CardshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
