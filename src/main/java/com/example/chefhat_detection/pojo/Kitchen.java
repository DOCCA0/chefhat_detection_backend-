package com.example.chefhat_detection.pojo;

public class Kitchen {
    String name;
    int id;
    HistoryVideo historyVideo;
    Alarm alarm;
    String location;//厨房的地址


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public HistoryVideo getHistoryVideo() {
        return historyVideo;
    }

    public void setHistoryVideo(HistoryVideo historyVideo) {
        this.historyVideo = historyVideo;
    }

    public Alarm getAlarm() {
        return alarm;
    }

    public void setAlarm(Alarm alarm) {
        this.alarm = alarm;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
