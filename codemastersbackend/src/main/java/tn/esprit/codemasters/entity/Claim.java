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
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    String content;

}
