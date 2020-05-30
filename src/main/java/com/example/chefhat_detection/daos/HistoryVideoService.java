package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.Alarm;
import com.example.chefhat_detection.pojo.HistoryVideo;
import com.example.chefhat_detection.pojo.HistoryVideo;
import com.example.chefhat_detection.pojo.Kitchen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

@Service
public class HistoryVideoService {

    public static final String URL = "jdbc:mysql://localhost:3306/chefhat_detection?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone = GMT";
    public static final String USER = "root";
    public static final String PASSWORD = "2947";
    public Connection conn;
    public Statement stmt;
    public ResultSet rs;
    @Autowired
    KitchenService kitchenService;
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
    public Set<HistoryVideo> getAllHistoryVideo() throws SQLException, ClassNotFoundException {
        openSql();
        Set<HistoryVideo> historyVideosSet=new HashSet<>();

        HistoryVideo tmp;
        String queryGet="SELECT * FROM `HistoryVideo`";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            tmp=new HistoryVideo();
            int id=rs.getInt("id");
            tmp.setId(id);
            tmp.setName(kitchenService.getKitchenName(id));
            tmp.setDate(rs.getDate("date"));
            tmp.setVideoUrl(rs.getURL("videoUrl"));
            historyVideosSet.add(tmp);
        }
        closeSql();
        return historyVideosSet;
    }

    public HistoryVideo getHistoryVideobyId(int id) throws SQLException, ClassNotFoundException {
        openSql();
        HistoryVideo historyVideo=new HistoryVideo();
        String queryGet="SELECT * FROM `HistoryVideo` WHERE id="+id+"";
        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            historyVideo.setId(rs.getInt("id"));
            historyVideo.setName(kitchenService.getKitchenName(id));
            historyVideo.setDate(rs.getDate("date"));
            historyVideo.setVideoUrl(rs.getURL("videoUrl"));
        }
        closeSql();
        return historyVideo;
    }
    public HistoryVideo getHistoryVideobyName(String name) throws SQLException, ClassNotFoundException {
        openSql();
        HistoryVideo historyVideo=new HistoryVideo();
        String queryGet="SELECT * FROM `HistoryVideo` WHERE id="+kitchenService.getKitchenId(name)+"";

        rs = stmt.executeQuery(queryGet);
        while(rs.next()){
            historyVideo.setId(rs.getInt("id"));
            historyVideo.setName(name);
            historyVideo.setDate(rs.getDate("date"));
            historyVideo.setVideoUrl(rs.getURL("videoUrl"));
        }

        closeSql();
        return historyVideo;
    }


}
