package tn.esprit.codemasters.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class UserTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    int score;

    @ManyToOne
    User user;

    @ManyToOne
    Test test;
    }
