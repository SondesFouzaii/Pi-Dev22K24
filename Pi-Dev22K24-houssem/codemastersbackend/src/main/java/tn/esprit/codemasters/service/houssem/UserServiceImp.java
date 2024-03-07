package tn.esprit.codemasters.service.houssem;

import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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
        if (userRepository.getUserByEmail(c.getEmail()) != null)
            throw new RuntimeException("Email already used. Please use a different email and try again.");
        try {
            KeyHolder holder = new GeneratedKeyHolder();
            SqlParameterSource parameters = getSqlParameterSource(c);
        }catch (EmptyResultDataAccessException exception){

        }catch (Exception exception){

        }
        c.setRole(User.Role.DEVELOPER);
        c.setEnabled(false);
        c.setImage("https://cdn-icons-png.flaticon.com/512/149/149071.png");
        c.setNon_locked(true);
        c.setUsing_mfa(false);
        return userRepository.save(c);
    }



    @Override
    public void removeUser(Long UserId) {
        userRepository.deleteById(UserId);
    }

    @Override
    public void bloquerdebloquer(Long UserId) {
        User toutou=userRepository.findById(UserId).orElse(null);
        if (!toutou.isEnabled())
            toutou.setEnabled(true);
        else
            toutou.setEnabled(false);

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
    private SqlParameterSource getSqlParameterSource(User c) {
        return null;
    }
}
