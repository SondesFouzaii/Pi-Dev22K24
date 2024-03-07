import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserstoryFrontComponent } from './list-userstory-front.component';

describe('ListUserstoryFrontComponent', () => {
  let component: ListUserstoryFrontComponent;
  let fixture: ComponentFixture<ListUserstoryFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserstoryFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserstoryFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
