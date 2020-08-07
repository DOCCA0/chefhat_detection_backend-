package com.example.chefhat_detection.controller;

import com.example.chefhat_detection.daos.*;
import com.example.chefhat_detection.pojo.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.chefhat_detection.pojo.Alarm;
import com.example.chefhat_detection.pojo.Kitchen;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;
import java.util.Set;

@Controller
public class WebController {
    @Autowired
    UserService userService;


    @GetMapping("/alarms")
    @ResponseBody
    public Set<Alarm> getAllAlarm() throws SQLException, ClassNotFoundException, IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        AlarmDao mapper = sqlSession.getMapper(AlarmDao.class);
        Set<Alarm> alarmSet = mapper.getallAlarm();
        sqlSession.commit();
        sqlSession.close();
        return alarmSet;
    }

    @GetMapping("/alarms/id/{id}")
    @ResponseBody
    public Alarm getAlarmById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException, IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        AlarmDao mapper = sqlSession.getMapper(AlarmDao.class);
        Alarm alarm = mapper.getAlarmbyId(id);
        sqlSession.commit();
        sqlSession.close();
        return alarm;
    }

    @GetMapping("/alarms/name/{name}")
    @ResponseBody
    public Alarm getAlarmByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException, IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        AlarmDao mapper = sqlSession.getMapper(AlarmDao.class);
        Alarm alarm = mapper.getAlarmbyName(name);
        sqlSession.commit();
        sqlSession.close();
        return alarm;
    }

//    @GetMapping("/historyVideos")
//    @ResponseBody
//    public Set<HistoryVideo> getAllHistoryVideos() throws SQLException, ClassNotFoundException {
//        Set<HistoryVideo> historyVideoSet = historyVideoService.getAllHistoryVideo();
//        return historyVideoSet;
//    }
//
//    @GetMapping("/historyVideos/id/{id}")
//    @ResponseBody
//    public HistoryVideo getHistoryVideoById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException {
//        HistoryVideo historyVideo = historyVideoService.getHistoryVideobyId(id);
//        return historyVideo;
//    }
//
//    @GetMapping("/historyVideos/name/{name}")
//    @ResponseBody
//    public HistoryVideo getHistoryVideoByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException {
//        HistoryVideo historyVideo = historyVideoService.getHistoryVideobyName(name);
//        return historyVideo;
//    }

    @GetMapping("/kitchens")
    @ResponseBody
    public Set<Kitchen> getAllKitchen() throws IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        KitchenDao mapper = sqlSession.getMapper(KitchenDao.class);
        Set<Kitchen> kitchens = mapper.getallkitchen();
        sqlSession.commit();
        sqlSession.close();
        return kitchens;
    }

    @GetMapping("/kitchens/id/{id}")
    @ResponseBody
    public Kitchen getKitchenById(@PathVariable("id") int id) throws SQLException, ClassNotFoundException, IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        KitchenDao mapper = sqlSession.getMapper(KitchenDao.class);
        Kitchen kitchen = mapper.getKitchenbyId(id);
        sqlSession.commit();
        sqlSession.close();
        return kitchen;
    }

    @GetMapping("/kitchens/name/{name}")
    @ResponseBody
    public Kitchen getKitchenByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException, IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        KitchenDao mapper = sqlSession.getMapper(KitchenDao.class);
        Kitchen kitchen = mapper.getKitchenName(name);
        sqlSession.commit();
        sqlSession.close();
        return kitchen;
    }

//    @PostMapping("/login")
//    public String getUserByName(@RequestParam("name") String name,
//                                @RequestParam("password") String password,
//                                Map<String, Object> map) throws SQLException, ClassNotFoundException {
//        User user;
//        if (userService.getUserByName(name) != null) {
//            user = userService.getUserByName(name);
//            if (password.equals(user.getPassword())) {
//                //登录成功
//                return "index";
//            }
//        }
//        map.put("msg", "用户名与密码不匹配");
//        return "login";
//    }
//
//
//    @PostMapping("/register")
//    public String postUser(@RequestParam("name") String name,
//                           @RequestParam("password") String password,
//                           @RequestParam("repeatPassword") String repeatPassword,
//                           Map<String, Object> map) throws SQLException, ClassNotFoundException {
//        Boolean success = true;
//        if (userService.getUserByName(name) != null) {
//            success = false;
//            map.put("msg1", "该用户名已被注册");
//        }
//        if (!password.equals(repeatPassword)) {
//            success = false;
//            map.put("msg2", "两次输入密码不一致");
//        }
//        if(success){
//            User user = new User(name,password);
//            userService.addUser(user);
//            return "login";
//        }else{
//            return "register";
//        }
//    }
}

