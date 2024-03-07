package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)

//@Table(name = "equipes")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(unique = true)
    String name;


    @ManyToMany(mappedBy="teams")
    private Set<User> users;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy="team")
    private Set<Project> projects;
}
