package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.Alarm;

import java.util.Set;

public interface AlarmDao {
    Set<Alarm> getallAlarm();
    Alarm getAlarmbyId(int id);
    Alarm getAlarmbyName(String name);
}
