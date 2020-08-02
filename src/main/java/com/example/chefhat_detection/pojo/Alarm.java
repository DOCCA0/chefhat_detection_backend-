package com.example.chefhat_detection.pojo;



import java.net.URL;
import java.sql.Date;
import java.util.List;

public class Alarm {
    int alarmId;
    int id;
    String name;//厨房的名字
    String type;//未戴厨师帽 和 佩戴休闲帽

    String dateTime;//2018-01-02 11:20:30的格式
    String picPath;//未戴厨师帽的图片位置

    public Alarm() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAlarmId(int alarmId) {
        this.alarmId = alarmId;
    }

    public int getAlarmId() {
        return alarmId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }
}
