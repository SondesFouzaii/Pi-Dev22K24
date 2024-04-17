import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostComponentFront } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponentFront;
  let fixture: ComponentFixture<AddPostComponentFront>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostComponentFront ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostComponentFront);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
