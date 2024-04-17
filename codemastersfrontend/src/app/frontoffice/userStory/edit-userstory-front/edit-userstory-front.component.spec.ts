import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserstoryFrontComponent } from './edit-userstory-front.component';

describe('EditUserstoryFrontComponent', () => {
  let component: EditUserstoryFrontComponent;
  let fixture: ComponentFixture<EditUserstoryFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserstoryFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserstoryFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
