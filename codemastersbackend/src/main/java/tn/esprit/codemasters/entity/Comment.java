package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)

@Table(name = "comments")//
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;
    String content;
    @Getter
    LocalDateTime createdAt;


    public Comment(Long Id, String content) {
        this.Id = Id;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }


    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference
    // Utilisation de @JsonBackReference pour éviter la récursion
    @JsonIgnore
    private Post post;




    //h
    @ManyToOne(cascade = CascadeType.ALL)

    User user;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private List<Reply> replies = new ArrayList<>();

}
