package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.Alarm;

import java.util.Set;

public interface AlarmDao {
    Set<Alarm> getallAlarm();
    Alarm getAlarmbyId(int id);
    Set<Alarm> getAlarmbyName(String name);
    Set<Alarm>getAlarmbyUserame(String username);
}
