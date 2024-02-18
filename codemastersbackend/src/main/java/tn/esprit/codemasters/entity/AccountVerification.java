package tn.esprit.codemasters.entity;

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
public class AccountVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String url;
    Date date;

    @ManyToOne(cascade = CascadeType.ALL)
    User user;
}
