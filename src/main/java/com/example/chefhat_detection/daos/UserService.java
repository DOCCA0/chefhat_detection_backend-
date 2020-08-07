package com.example.chefhat_detection.daos;

import com.example.chefhat_detection.pojo.Kitchen;
import com.example.chefhat_detection.pojo.User;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    HashMap<String,User> usersMap=new HashMap<>();

    public UserService(){
        usersMap.put("aa",new User("aa","11"));
        usersMap.put("bb",new User("bb","22"));
        usersMap.put("cc",new User("cc","33"));
        usersMap.put("dd",new User("dd","44"));
    }

    
    public User getUserByName(String name) {
        User user = usersMap.get(name);
        return user;
    }

    public void addUser(User user){
        usersMap.put(user.getName(),user);
    }
}
