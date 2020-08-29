package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.User;

import java.util.List;

public interface UserDao {
    User findUserByUserName(String username);
    void addUser(String username,String password);
}
