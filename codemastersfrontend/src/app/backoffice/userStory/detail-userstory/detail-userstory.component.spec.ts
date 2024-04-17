import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserstoryComponent } from './detail-userstory.component';

describe('DetailUserstoryComponent', () => {
  let component: DetailUserstoryComponent;
  let fixture: ComponentFixture<DetailUserstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUserstoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
