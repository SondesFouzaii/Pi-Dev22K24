package tn.esprit.codemasters.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;
    String content;
    //String image;
    //String video;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    Date creationDate;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonIgnore
    private List<Tag> tags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore // Ignore the comments during serialization to break the circular reference
    private List<Comment> comments;

    @PrePersist
    protected void onCreate() {
        creationDate = new Date();
    }

    @PostLoad
    protected void onLoad() {
        if (getCreationDate() != null) {
            creationDate = new Date(getCreationDate().getTime());
        }
    }

   /* @Transient
    @JsonIgnore
    private List<User> likesByUser = new ArrayList<>();*/

    @OneToMany
    @JsonIgnore
    List<User> liked = new ArrayList<>();

    public List<User> getliked() {
        return liked;
    }

    public void setliked(List<User> liked) {
        this.liked = liked;
    }

    @ManyToOne
    @JsonIgnore // Ignore the user during serialization to avoid circular reference
    User user;
}