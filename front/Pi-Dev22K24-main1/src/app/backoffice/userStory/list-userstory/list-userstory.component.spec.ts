import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserstoryComponent } from './list-userstory.component';

describe('ListUserstoryComponent', () => {
  let component: ListUserstoryComponent;
  let fixture: ComponentFixture<ListUserstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserstoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
