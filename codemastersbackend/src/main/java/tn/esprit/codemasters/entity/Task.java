package tn.esprit.codemasters.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

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




    
    public enum TaskStat{
        TO_DO,IN_PROGRESS,FINISHED
    }
    public enum TaskPriority{
        LOW,MEDIUM,HIGH
    }
    public enum TaskComplexity{
        LOW,MEDIUM,HIGH
    }



}
