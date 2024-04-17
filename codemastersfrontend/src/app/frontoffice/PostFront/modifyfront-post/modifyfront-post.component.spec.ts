import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyfrontPostComponent } from './modifyfront-post.component';

describe('ModifyfrontPostComponent', () => {
  let component: ModifyfrontPostComponent;
  let fixture: ComponentFixture<ModifyfrontPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyfrontPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyfrontPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
