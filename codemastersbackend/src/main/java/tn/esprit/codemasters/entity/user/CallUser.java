package tn.esprit.codemasters.entity.user;

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
public class CallUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    boolean ansered;
    long idappelant;
    String nomappelant;
    long idappeler;
    String nomappeler;
    String message;
    Date date;
    }