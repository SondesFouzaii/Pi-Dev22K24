package tn.esprit.codemasters.entity.quiz;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.codemasters.entity.UserTest;

import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    String description;
    String image;
    boolean active;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="test")
    private Set<UserTest> userTests;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Question> questions;
    }
