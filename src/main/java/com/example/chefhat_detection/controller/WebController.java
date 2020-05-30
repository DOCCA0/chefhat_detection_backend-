package com.example.chefhat_detection.controller;

import com.example.chefhat_detection.daos.AlarmService;
import com.example.chefhat_detection.daos.HistoryVideoService;
import com.example.chefhat_detection.daos.KitchenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.chefhat_detection.pojo.Alarm;
import com.example.chefhat_detection.pojo.HistoryVideo;
import com.example.chefhat_detection.pojo.Kitchen;

import java.sql.SQLException;
import java.util.Set;

@Controller
public class WebController {
    @Autowired
    AlarmService alarmService;
    @Autowired
    HistoryVideoService historyVideoService;
    @Autowired
    KitchenService kitchenService;


    @GetMapping("/alarms")
    @ResponseBody
    public Set<Alarm> getAllAlarm() throws SQLException, ClassNotFoundException {
        Set<Alarm> alarmSet = alarmService.getallAlarm();
        return alarmSet;
    }

    @GetMapping("/alarms/id/{id}")
    @ResponseBody
    public Alarm getAlarmById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException {
        Alarm alarm = alarmService.getAlarmbyId(id);
        return alarm;
    }

    @GetMapping("/alarms/name/{name}")
    @ResponseBody
    public Alarm getAlarmByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException {
        Alarm alarm = alarmService.getAlarmbyName(name);
        return alarm;
    }

    @GetMapping("/historyVideos")
    @ResponseBody
    public Set<HistoryVideo> getAllHistoryVideos() throws SQLException, ClassNotFoundException {
        Set<HistoryVideo> historyVideoSet = historyVideoService.getAllHistoryVideo();
        return historyVideoSet;
    }

    @GetMapping("/historyVideos/id/{id}")
    @ResponseBody
    public HistoryVideo getHistoryVideoById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException {
        HistoryVideo historyVideo = historyVideoService.getHistoryVideobyId(id);
        return historyVideo;
    }

    @GetMapping("/historyVideos/name/{name}")
    @ResponseBody
    public HistoryVideo getHistoryVideoByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException {
        HistoryVideo historyVideo = historyVideoService.getHistoryVideobyName(name);
        return historyVideo;
    }

    @GetMapping("/kitchens")
    @ResponseBody
    public Set<Kitchen> getAllKitchen() throws SQLException, ClassNotFoundException {
        Set<Kitchen>  kitchenSet = kitchenService.getallkitchen();
        return kitchenSet;
    }

    @GetMapping("/kitchens/id/{id}")
    @ResponseBody
    public Kitchen getKitchenById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException {
        Kitchen kitchen = kitchenService.getKitchenbyId(id);
        return kitchen;
    }

    @GetMapping("/kitchens/name/{name}")
    @ResponseBody
    public Kitchen getKitchenByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException {
        Kitchen kitchen = kitchenService.getAlarmbyName(name);
        return kitchen;
    }
}
