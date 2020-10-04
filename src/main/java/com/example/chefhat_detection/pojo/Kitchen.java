package com.example.chefhat_detection.pojo;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Kitchen {
    String name;
    int id;
    String organization;
    String location;//厨房的地址
}
