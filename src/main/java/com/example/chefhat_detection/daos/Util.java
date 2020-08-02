package com.example.chefhat_detection.daos;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;


public class Util {
    public static SqlSessionFactory sqlSessionFactory;

    public static SqlSessionFactory getSqlSessionFactory() throws IOException {
        if(sqlSessionFactory==null){
            InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory1 = new SqlSessionFactoryBuilder().build(resourceAsStream);
            sqlSessionFactory=sqlSessionFactory1;
            return sqlSessionFactory;
        }
        else{
            return sqlSessionFactory;
        }
    }

}


