package tn.esprit.codemasters.service;

import tn.esprit.codemasters.entity.UserStory;

import java.util.List;

public interface IUserStoryInt {




    public List<UserStory> retrieveAllUsersStory();
    public UserStory retrieveUserStory(Long UserStrId);
    public UserStory addUserStory(UserStory c);
    public void removeUserStory(Long UserId);
  //  public void bloquerdebloquer(Long UserStrId);
    public UserStory modifyUserStory(UserStory userStory);

}
