import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectsToTeamComponent } from './add-projects-to-team.component';

describe('AddProjectsToTeamComponent', () => {
  let component: AddProjectsToTeamComponent;
  let fixture: ComponentFixture<AddProjectsToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectsToTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectsToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
