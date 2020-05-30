package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.Alarm;
import com.example.chefhat_detection.pojo.Kitchen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

@Service
public class AlarmService {


    @Autowired
    KitchenService kitchenService;
    public static final String URL = "jdbc:mysql://localhost:3306/chefhat_detection?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone = GMT";
    public static final String USER = "root";
    public static final String PASSWORD = "2947";
    public Connection conn;
    public Statement stmt;
    public ResultSet rs;


    public void openSql() throws ClassNotFoundException, SQLException {
        //1.加载驱动程序
        Class.forName("com.mysql.cj.jdbc.Driver");
        //2. 获得数据库连接
        conn = DriverManager.getConnection(URL, USER, PASSWORD);
        //3.操作数据库，实现增删改查
        stmt = conn.createStatement();
    }

    public void closeSql(){
        if(rs!=null)
        {
            try {
                rs.close();
            } catch (SQLException throwable) {
                throwable.printStackTrace();
            }
        }

        if(stmt!=null)
        {
            try {
                stmt.close();
            } catch (SQLException throwable) {
                throwable.printStackTrace();
            }
        }

        if(conn!=null)
        {
            try {
                conn.close();
            } catch (SQLException throwable) {
                throwable.printStackTrace();
            }
        }
    }

    public Set<Alarm> getallAlarm() throws SQLException, ClassNotFoundException {
        openSql();
        Set<Alarm> alarmSet=new HashSet<>();
        Alarm tmp;
        String queryGet="SELECT * FROM `Alarm`";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            tmp=new Alarm();
            int id = rs.getInt("id");
            tmp.setId(id);
            tmp.setAlarmId(rs.getInt("alarmId"));
            tmp.setName(kitchenService.getKitchenName(id));
            tmp.setType(rs.getString("type"));
            tmp.setDate(rs.getString("datetime"));
            tmp.setPicPath(rs.getString("picPath"));
            alarmSet.add(tmp);
        }
        closeSql();
//        for (Alarm alarm :alarmSet){
//            alarm.setName(kitchenService.getKitchenbyId(alarm.getId()).getName());
//        }
        return alarmSet;
    }



    public Alarm getAlarmbyId(int id) throws SQLException, ClassNotFoundException {
        openSql();
        Alarm alarm=new Alarm();
        String queryGet="SELECT * FROM `Alarm` WHERE id="+id+";";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            alarm.setId(rs.getInt("id"));
            alarm.setAlarmId(rs.getInt("alarmId"));
            alarm.setName(kitchenService.getKitchenName(id));
            alarm.setType(rs.getString("type"));
            alarm.setDate(rs.getString("datetime"));
            alarm.setPicPath(rs.getString("picPath"));
        }
        closeSql();
        return alarm;
    }


    public Alarm getAlarmbyName(String name) throws SQLException, ClassNotFoundException {
        openSql();
        int id = kitchenService.getKitchenId(name);
        Alarm alarm=new Alarm();
        String queryGet="SELECT * FROM `Alarm` WHERE id="+id+"";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            alarm.setId(id);
            alarm.setAlarmId(rs.getInt("alarmId"));
            alarm.setType(rs.getString("type"));
            alarm.setName(name);
            alarm.setDate(rs.getString("datetime"));
            alarm.setPicPath(rs.getString("picPath"));
        }
        closeSql();
        return alarm;
    }

}
