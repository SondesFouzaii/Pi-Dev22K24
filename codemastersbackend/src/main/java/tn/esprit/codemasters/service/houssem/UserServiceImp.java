package tn.esprit.codemasters.service.houssem;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import tn.esprit.codemasters.entity.Comment;
import tn.esprit.codemasters.entity.Session;
import tn.esprit.codemasters.entity.User;
import tn.esprit.codemasters.repository.CommentRepository;
import tn.esprit.codemasters.repository.PostRepository;
import tn.esprit.codemasters.repository.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.Properties;

@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImp implements IUserService{
    UserRepository userRepository;
    CommentRepository commentRepository;
    PostRepository postRepository;
    private static final String key = "houssem";
    /**
     * @param simpleuser
     * @return
     */
    @Override
    public String addSimpleUser(User simpleuser) {
        try {
            if (userRepository.getUserByEmail(simpleuser.getEmail()) != null)
                return "Email already used. Please use a different email and try again.";

            simpleuser.setRole(User.Role.DEVELOPER);
            simpleuser.setEnabled(true);
            simpleuser.setImage("https://cdn-icons-png.flaticon.com/512/149/149071.png");
            simpleuser.setNon_locked(false);
            simpleuser.setUsing_mfa(false);
            simpleuser.setCreated_date(new Date());

            String pwd = simpleuser.getPassword();
            String encryptedPassword = encrypt(pwd);
            simpleuser.setPassword(encryptedPassword);

            userRepository.save(simpleuser);

            return "Account added successfully";
        } catch (Exception e) {
            log.error("Error occurred while adding a user: " + e.getMessage());
            return "Failed to add user. Please try again later.";
        }
    }


    /**
     * @param advanceduser
     * @return
     */
    @Override
        public String addUser(User advanceduser) {
        try {
            // Check if the email already exists in the database
            if (userRepository.getUserByEmail(advanceduser.getEmail()) != null) {
                return "Email already used. Please use a different email and try again.";
            }

            advanceduser.setEnabled(true);
            advanceduser.setImage("https://cdn-icons-png.flaticon.com/512/149/149071.png");
            advanceduser.setNon_locked(true);
            advanceduser.setUsing_mfa(false);
            advanceduser.setCreated_date(new Date());

            String pwd = advanceduser.getPassword();
            String encryptedPassword = encrypt(pwd);
            advanceduser.setPassword(encryptedPassword);

            userRepository.save(advanceduser);

            return "User added successfully";
        } catch (Exception e) {
            log.error("Error occurred while adding a user: " + e.getMessage());
            return "Failed to add user. Please try again later.";
        }
    }


    /**
     * @param email
     * @param password
     * @return
     */

    @Override
    public ResponseEntity<String> findbyemailandpassword(String email, String password) {
        User user = userRepository.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email or password are wrong. Please try again.");
        }

        if (!user.getPassword().equals(encrypt(password))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email or password are wrong. Please try again.");
        }

        if (user.getRole().equals(User.Role.ADMIN)) {
            return ResponseEntity.status(HttpStatus.OK).body("Welcome Admin");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("Welcome User");
        }
    }

    /**
     * @param userid
     * @return
     */
    @Override
    public User retrieveUser(Long userid) {
        return userRepository.findById(userid).orElse(null);
    }

    /**
     * @param user
     * @return
     */
    @Override//we dont use that for now
    public String updateUser(User user) {
        User updatedUser = userRepository.save(user);
        if (updatedUser != null) {
            return "User updated successfully";
        } else {
            return "Failed to update user";
        }
    }

    /**
     * @param user
     * @return
     */
    @Override
    public String updatepersonalinformations(User user) {
        User olduser=userRepository.findById(user.getId()).orElse(null);
        olduser.setFirst_name(user.getFirst_name());
        olduser.setLast_name(user.getLast_name());
        olduser.setBirth_date(user.getBirth_date());
        olduser.setGender(user.getGender());
        olduser.setAddress(user.getAddress());
        olduser.setPhone_number(user.getPhone_number());
        olduser.setUsing_mfa(user.isUsing_mfa());
        userRepository.save(olduser);
        return "account updated succesfuly";
    }


    /**
     * @param userid
     * @param pwd
     * @return
     */
    @Override
    public String updatePWDUser(Long userid, String pwd) {
        User user=userRepository.findById(userid).orElse(null);
        user.setPassword(encrypt(pwd));
        userRepository.save(user);
        return "password updated succesfully";
    }

    /**
     * @param userid
     * @param image
     * @return
     */
    @Override
    public String updateImgUser(Long userid, String image) {
        User user=userRepository.findById(userid).orElse(null);
        user.setImage(image);
        return "your profile picture is updated succesfuly";
    }

    /**
     * @return
     */
    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    /**
     * @param userid
     */
    @Override
    public void blockunblock(Long userid) {
        User user=userRepository.findById(userid).orElse(null);
        if (!user.isEnabled())
            user.setEnabled(true);
        else
            user.setEnabled(false);

        userRepository.save(user);
    }

    /**
     * @param userid
     * @param role
     */
    @Override
    public void modifyRole(Long userid, User.Role role) {
        User user=userRepository.findById(userid).orElse(null);
        user.setRole(role);
        userRepository.save(user);
    }

    /**
     * @param email
     * @return
     */
    @Override
    public String resetpwd(String email) {
        User user=userRepository.getUserByEmail(email);
        sendEmail(email,decrypt(user.getPassword()));
        return "password sent seccesfuly";
    }

    /**
     * @param code
     * @return
     */
    @Override
    public boolean verifyaccount(String code) {
        return false;
    }

    /**
     * @param comment
     * @return
     */
    @Override
    public Comment addcomment(Comment comment,Long idu,Long idp) {
        comment.setUser(userRepository.findById(idu).orElse(null));
        comment.setPost(postRepository.findById(idp).orElse(null));
        return commentRepository.save(comment);
    }


    // encript the password
        public static String encrypt(String text) {
            StringBuilder encrypted = new StringBuilder();
            int keyIndex = 0;

            for (int i = 0; i < text.length(); i++) {
                char currentChar = text.charAt(i);
                char keyChar = key.charAt(keyIndex);
                int shift = keyChar - 'a';

                if (Character.isUpperCase(currentChar)) {
                    char encryptedChar = (char) ('A' + (currentChar - 'A' + shift) % 26);
                    encrypted.append(encryptedChar);
                } else if (Character.isLowerCase(currentChar)) {
                    char encryptedChar = (char) ('a' + (currentChar - 'a' + shift) % 26);
                    encrypted.append(encryptedChar);
                } else {
                    // If it's not a letter, just append it as is
                    encrypted.append(currentChar);
                    continue;
                }

                // Move to the next character in the key
                keyIndex = (keyIndex + 1) % key.length();
            }

            return encrypted.toString();
        }
        //decrypt the password
        public static String decrypt(String encryptedText) {
            StringBuilder decrypted = new StringBuilder();
            int keyIndex = 0;

            for (int i = 0; i < encryptedText.length(); i++) {
                char currentChar = encryptedText.charAt(i);
                char keyChar = key.charAt(keyIndex);
                int shift = keyChar - 'a';

                if (Character.isUpperCase(currentChar)) {
                    char decryptedChar = (char) ('A' + (currentChar - 'A' - shift + 26) % 26);
                    decrypted.append(decryptedChar);
                } else if (Character.isLowerCase(currentChar)) {
                    char decryptedChar = (char) ('a' + (currentChar - 'a' - shift + 26) % 26);
                    decrypted.append(decryptedChar);
                } else {
                    // If it's not a letter, just append it as is
                    decrypted.append(currentChar);
                    continue;
                }

                // Move to the next character in the key
                keyIndex = (keyIndex + 1) % key.length();
            }

            return decrypted.toString();
        }

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String recipient,String pwd) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(recipient);
            helper.setSubject("Test email");
            helper.setText("Bonjour, admin une nouvelle station a ete ajouter!"+pwd);
            emailSender.send(message);
            System.out.println("Message envoye");
        } catch (MessagingException e) {
            System.out.println("Error: " + e.toString());
        }
    }

}
