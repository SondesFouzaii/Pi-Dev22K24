package tn.esprit.codemasters.service.houssem;

import tn.esprit.codemasters.entity.User;

import java.util.List;

public interface IUserService {
    public List<User> retrieveAllUsers();
    public User retrieveUser(Long UserId);
    public User addUser(User c);
    public void removeUser(Long UserId);
    public void bloquerdebloquer(Long UserId);
    public User modifyUser(User user);
    public User modifyRole(Long UserId,User.Role role);
}
