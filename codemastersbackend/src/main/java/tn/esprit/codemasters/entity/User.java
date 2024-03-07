package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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


    //h
    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Notification> notifications;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    @JsonIgnore
    private Set<Post> Posts;
    //les developpeurs
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonBackReference
    private Set<Team> teams;
    //product owner
    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Project> Projectproductowner;
    //scrum master
    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Project> Projectscrummaster;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    @JsonIgnore
    private Set<Claim> Claims;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    @JsonIgnore
    private Set<UserStory> UserStorys;
}
