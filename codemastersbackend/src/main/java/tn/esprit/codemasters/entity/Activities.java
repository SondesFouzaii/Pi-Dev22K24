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
public class Activities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String foradmin;
    String foruser;
    Date date;
    long idaccount;
    }
