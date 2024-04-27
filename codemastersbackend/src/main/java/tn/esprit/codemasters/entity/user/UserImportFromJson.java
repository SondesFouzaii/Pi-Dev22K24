package tn.esprit.codemasters.entity.user;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class UserImportFromJson {

    long id;
    //String name;
    String firstName;
    String lastName;
    String email;
    String password;
    String image;
    //User.Role role;
    Date birthDate;
    String gender;
    Address address;
    String phone;
    Bank bank;


// maybe in the future i'll use them
    String bloodGroup;
    String height;
    String weight;
    String eyeColor;
    String domain;
    String ip;
    String macAddress;
    String university;
/*          exemple
       "users": [
    {
      "id": 1,
      "firstName": "Terry", ok
      "lastName": "Medhurst", ok
      "maidenName": "Smitham",
      "age": 50,
      "gender": "male",    ok
      "email": "atuny0@sohu.com", ok
      "phone": "+63 791 675 8914",
      "username": "atuny0",
      "password": "9uQFF1Lh", ok
      "birthDate": "2000-12-25", ok
      "image": "https://robohash.org/Terry.png?set=set4", ok
      "bloodGroup": "A-",
      "height": 189,
      "weight": 75.4,
      "eyeColor": "Green",
      "hair": { "color": "Black", "type": "Strands" },
      "domain": "slashdot.org",
      "ip": "117.29.86.254",
      "address": {
        "address": "1745 T Street Southeast",
        "city": "Washington",
        "coordinates": { "lat": 38.867033, "lng": -76.979235 },
        "postalCode": "20020",
        "state": "DC"
      },
      "macAddress": "13:69:BA:56:A3:74",
      "university": "Capitol University",
      "bank": {
        "cardExpire": "06/22",
        "cardNumber": "50380955204220685",
        "cardType": "maestro",
        "currency": "Peso",
        "iban": "NO17 0695 2754 967"
      },
      "company": {
        "address": {
          "address": "629 Debbie Drive",
          "city": "Nashville",
          "coordinates": { "lat": 36.208114, "lng": -86.58621199999999 },
          "postalCode": "37076",
          "state": "TN"
        },
        "department": "Marketing",
        "name": "Blanda-O'Keefe",
        "title": "Help Desk Operator"
      },
      "ein": "20-9487066",
      "ssn": "661-64-2976",
      "userAgent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      }
    }
*/
}




