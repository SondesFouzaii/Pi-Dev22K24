package tn.esprit.codemasters.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Sprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    Date startDate;
    Date endDate;
    StatSprint status;
    Double velocity;
    String retrospective;

    public enum StatSprint{
        ACTIF,CLOSED
    }


    //Liste des tâches : List<Tâche>



}
