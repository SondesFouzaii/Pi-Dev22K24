package tn.esprit.codemasters.entity;

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
        PLANNED,IN_PROGRESS,COMPLETED
    }


    //Liste des tâches : List<Tâche>

    @OneToMany(mappedBy="sprint")
    private Set<Task> Tasks;
}
