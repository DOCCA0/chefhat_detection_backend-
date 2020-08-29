package com.example.chefhat_detection.pojo;



import lombok.*;

import java.net.URL;
import java.sql.Date;
import java.util.List;
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Alarm {
    int alarmId;
    int id;
    String name;//厨房的名字
    String type;//未戴厨师帽 和 佩戴休闲帽
    String dateTime;//2018-01-02 11:20:30的格式
    String picPath;//未戴厨师帽的图片位置

}
