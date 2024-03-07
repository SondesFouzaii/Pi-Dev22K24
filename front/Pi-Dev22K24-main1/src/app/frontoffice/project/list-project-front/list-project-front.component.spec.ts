import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectFrontComponent } from './list-project-front.component';

describe('ListProjectFrontComponent', () => {
  let component: ListProjectFrontComponent;
  let fixture: ComponentFixture<ListProjectFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjectFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
