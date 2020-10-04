package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.User;

import java.util.List;
import java.util.Set;

public interface UserDao {
    User findUserByUserName(String username);
    Set<User> getAllUsers();
    void addUser(String username,String password);
    void deleteUser(String username);
    void updateUserPassword(String username,String password,String email,String role);
}
