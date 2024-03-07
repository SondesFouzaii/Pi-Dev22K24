package tn.esprit.codemasters.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImp implements IUserService{
    UserRepository userRepository;
    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User retrieveUser(Long UserId) {
        return userRepository.findById(UserId).orElse(null);
    }

    @Override
    public User addUser(User c) {
        c.setRole(User.Role.DEVELOPER);
        c.setEtat(0);
        return userRepository.save(c);
    }

    @Override
    public void removeUser(Long UserId) {
        userRepository.deleteById(UserId);
    }

    @Override
    public void bloquerdebloquer(Long UserId) {
        User toutou=userRepository.findById(UserId).orElse(null);
        if (toutou.getEtat()==0)
            toutou.setEtat(1);
        else
            toutou.setEtat(0);

        userRepository.save(toutou);
    }

    @Override
    public User modifyUser(User user) {
        user.setRole(User.Role.DEVELOPER);
        return userRepository.save(user);
    }

    @Override
    public User modifyRole(Long UserId, User.Role role) {
        User mo7sen=userRepository.findById(UserId).orElse(null);
        mo7sen.setRole(role);
        return userRepository.save(mo7sen);
    }
}
