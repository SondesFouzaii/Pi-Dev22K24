package tn.esprit.codemasters.entity.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class Address {
    String address;
    String city;
    String postalCode;
    String state;

}
