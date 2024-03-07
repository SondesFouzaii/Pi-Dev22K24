import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToTeamComponent } from './add-users-to-team.component';

describe('AddUsersToTeamComponent', () => {
  let component: AddUsersToTeamComponent;
  let fixture: ComponentFixture<AddUsersToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersToTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsersToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
