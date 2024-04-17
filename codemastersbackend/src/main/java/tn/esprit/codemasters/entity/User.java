package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

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
    //String name;
    String first_name;
    String last_name;
    @Temporal(TemporalType.DATE)
    Date birth_date;
    @Enumerated(EnumType.STRING)
    Gender gender;
    String address;
    String phone_number;
    @Column(unique = true)
    String email;
    String password;
    String image;
    String status;
    @Enumerated(EnumType.STRING)
    Role role;
    String barrcode;
    boolean enabled;
    boolean non_locked;
    boolean using_mfa;
    @Temporal(TemporalType.DATE)
    Date created_date;


    public enum Gender{
        Homme,Femme,Non_Binaire,Genre_Fluide,Agender,Bigenre,Trigender,Genderqueer
    }
    public enum Role{
        PRODUCT_OWNER,DEVELOPER,SCRUM_MASTER,ADMIN
    }


    //h
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Notification> notifications;

    //les developpeurs
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Team> teams;
    //product owner
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Project> projectproductowner;
    //scrum master
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Project> projectscrummaster;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Claim> claims;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<UserStory> userStorys;


}
