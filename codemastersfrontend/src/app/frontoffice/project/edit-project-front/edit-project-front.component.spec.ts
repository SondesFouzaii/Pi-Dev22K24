import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectFrontComponent } from './edit-project-front.component';

describe('EditProjectFrontComponent', () => {
  let component: EditProjectFrontComponent;
  let fixture: ComponentFixture<EditProjectFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
