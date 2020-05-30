package com.example.chefhat_detection.daos;
import com.example.chefhat_detection.pojo.Kitchen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

@Service
public class KitchenService {
    public static final String URL = "jdbc:mysql://localhost:3306/chefhat_detection?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone = GMT";
    public static final String USER = "root";
    public static final String PASSWORD = "2947";
    public Connection conn;
    public Statement stmt;
    public ResultSet rs;
    @Autowired
    HistoryVideoService historyVideoService;
    @Autowired
    AlarmService alarmService;

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
    public Set<Kitchen> getallkitchen() throws SQLException, ClassNotFoundException {
        openSql();
        Set<Kitchen> kichenSet=new HashSet<>();
        String queryGet="SELECT * FROM `Kitchen`";
        rs = stmt.executeQuery(queryGet);
        Kitchen tmp;
        while(rs.next()){
            tmp=new Kitchen();
            int id=rs.getInt("id");
            tmp.setId(id);
            tmp.setName(rs.getString("name"));
            tmp.setLocation(rs.getString("location"));
            tmp.setHistoryVideo(historyVideoService.getHistoryVideobyId(id));
            tmp.setAlarm(alarmService.getAlarmbyId(id));
            kichenSet.add(tmp);
        }
        closeSql();
        return kichenSet;
    }
    public Kitchen getKitchenbyId(int id) throws SQLException, ClassNotFoundException {
        openSql();
        Kitchen kitchen=new Kitchen();
        String queryGet="SELECT * FROM `Kitchen` WHERE id='"+id+"'";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            kitchen.setId(rs.getInt("id"));
            kitchen.setName(rs.getString("name"));
            kitchen.setLocation(rs.getString("location"));
            kitchen.setHistoryVideo(historyVideoService.getHistoryVideobyId(rs.getInt("id")));
            kitchen.setAlarm(alarmService.getAlarmbyId(rs.getInt("id")));
        }

        closeSql();
        return kitchen;
    }
    public Kitchen getAlarmbyName(String name) throws SQLException, ClassNotFoundException {
        openSql();
        Kitchen kitchen=new Kitchen();
        String queryGet="SELECT * FROM `Kitchen` WHERE name='"+name+"'";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            kitchen.setId(rs.getInt("id"));
            kitchen.setName(rs.getString("name"));
            kitchen.setLocation(rs.getString("location"));
            kitchen.setHistoryVideo(historyVideoService.getHistoryVideobyId(rs.getInt("id")));
            kitchen.setAlarm(alarmService.getAlarmbyId(rs.getInt("id")));
        }
        closeSql();
        return kitchen;
    }
    public String getKitchenName(int id) throws SQLException, ClassNotFoundException {
        openSql();
        Kitchen kitchen=new Kitchen();
        String queryGet="SELECT * FROM `Kitchen` WHERE id='"+id+"'";
        ResultSet rs2 = stmt.executeQuery(queryGet);
        while(rs2.next()){
            kitchen.setId(rs2.getInt("id"));
            kitchen.setName(rs2.getString("name"));
        }
        return kitchen.getName();
    }
    public int  getKitchenId(String name) throws SQLException, ClassNotFoundException {
        openSql();
        Kitchen kitchen=new Kitchen();
        String queryGet="SELECT * FROM `Kitchen` WHERE name='"+name+"'";
        ResultSet rs2 = stmt.executeQuery(queryGet);
        while(rs2.next()){
            kitchen.setId(rs2.getInt("id"));
            kitchen.setName(rs2.getString("name"));
        }
        return kitchen.getId();
    }

}
