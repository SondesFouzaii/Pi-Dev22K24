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
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    int value;
    int finalvote;

    //h
    @ManyToOne(cascade = CascadeType.ALL)
    UserStory userstory;

    @ManyToOne(cascade = CascadeType.ALL)
    User user;

    @ManyToOne(cascade = CascadeType.ALL)
    Card card;
}
