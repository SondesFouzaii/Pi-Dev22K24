package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;

    @Temporal(TemporalType.DATE)
    private Date dateSession;

    private String timeSession;

    @Enumerated(EnumType.STRING)
    Etat etat;
    @Column(unique = true)
    int code;
    String url;

    @Temporal(TemporalType.TIME)
    private Date startSessionDate;

    @Temporal(TemporalType.TIME)
    private Date EndSessionDate;


    public enum Etat {
        CLOSED, ACTIVE, EXPIRED
    }


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Message> messages;

    @ManyToOne(cascade = CascadeType.ALL)
    Card card;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="session")
    private Set<FeedBack> feedBacks;

    @JsonIgnore
    @OneToOne
    private Project project;




}
