import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfUserComponent } from './post-of-user.component';

describe('PostOfUserComponent', () => {
  let component: PostOfUserComponent;
  let fixture: ComponentFixture<PostOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOfUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
