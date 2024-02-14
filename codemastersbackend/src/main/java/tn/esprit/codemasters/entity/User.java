package tn.esprit.codemasters.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        long id;
        String name;
        String first_name;
        String last_name;
        @Temporal(TemporalType.DATE)
        Date birth_date;
        @Enumerated(EnumType.STRING)
        Gender gender;
        String address;
        String phone_number;
        String email;
        String password;
        String image;
        String security_question;
        String security_answer;
        String status;
        @Enumerated(EnumType.STRING)
        Role role;
        String theme_preferences;
        int etat;

    public enum Gender{
        Homme,Femme,Non_Binaire,Genre_Fluide,Agender,Bigenre,Trigender,Genderqueer
    }
    public enum Role{
        PRODUCT_OWNER,DEVELOPER,SCRUM_MASTER,ADMIN
    }
}
