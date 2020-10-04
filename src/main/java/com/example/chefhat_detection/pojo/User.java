package com.example.chefhat_detection.pojo;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
    String id;
    String username;
    String password;
    String role;
//    List<Kitchen> kitchens;
//    @Email
    String email;
}
