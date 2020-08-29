package com.example.chefhat_detection.controller;

import com.example.chefhat_detection.daos.*;
import com.example.chefhat_detection.pojo.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.chefhat_detection.pojo.Alarm;
import com.example.chefhat_detection.pojo.Kitchen;

import java.io.IOException;
import java.security.Principal;
import java.sql.SQLException;
import java.util.Map;
import java.util.Set;

@Controller
public class WebController {



    @GetMapping("/alarms")
    @ResponseBody
    public Set<Alarm> getAlarms() throws  IOException {
        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        AlarmDao mapper = sqlSession.getMapper(AlarmDao.class);

        UserDetails principal = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(principal.getAuthorities().toString());
        Set<Alarm> alarmSet;
        //root可以看到所有厨房记录
        if(principal.getAuthorities().toString().contains("root")){
            alarmSet=  mapper.getallAlarm();
        }else{
            alarmSet =  mapper.getAlarmbyUserame(principal.getUsername());
        }
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

//    @GetMapping("/alarms/name/{name}")
//    @ResponseBody
//    public Alarm getAlarmByName(@PathVariable("name") String name) throws SQLException, ClassNotFoundException, IOException {
//        SqlSessionFactory sqlSessionFactory = Util.getSqlSessionFactory();
//        SqlSession sqlSession = sqlSessionFactory.openSession();
//        AlarmDao mapper = sqlSession.getMapper(AlarmDao.class);
//        Alarm alarm = mapper.getAlarmbyName(name);
//        sqlSession.commit();
//        sqlSession.close();
//        return alarm;
//    }

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

    @PostMapping("/doRegister")
    public String addUser(User user) throws IOException {
        System.out.printf(user.toString());
        SqlSessionFactory sqlSessionFactory=Util.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        mapper.addUser(user.getUsername(),user.getPassword());
        sqlSession.commit();
        sqlSession.close();
        return "/login";
    }
}

