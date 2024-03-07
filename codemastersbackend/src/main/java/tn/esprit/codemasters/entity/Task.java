package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    String description;
    TaskStat status;
    TaskPriority priority;
    TaskComplexity complexity;
    Long cardvalue ;



    
    public enum TaskStat{
        TO_DO,IN_PROGRESS,FINISHED
    }
    public enum TaskPriority{
        LOW,MEDIUM,HIGH
    }
    public enum TaskComplexity{
        LOW,MEDIUM,HIGH
    }
    //@OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    //@JsonIgnore
  //  private Card card;

    //
   // @ToString.Exclude
   // @ManyToOne
  //  UserStory userstory;


    //@ToString.Exclude
   // @ManyToOne
      //      @JsonIgnore
  //  Sprint sprint;


}
