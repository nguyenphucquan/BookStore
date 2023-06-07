package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
	
	@Autowired
    private  UserRepository userRepository;


    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public User add(User user) {
        // Check if the username already exists
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new IllegalArgumentException("Username already exists.");
        }
        
        if (user.getRoles() == null) {
            user.setRoles("USER");
        }
        
        // Encode the user's password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassWord(encodedPassword);

        // Save the user to the repository
        return userRepository.save(user);
    }

    public User getUserByUserName(String username) {
    	List<User> list = userRepository.findAll();
    	if(list.size()==0) {
    		return null;
    	}else {
        	for(User u:list) {
        		if(u.getUserName().equalsIgnoreCase(username)){
        			return u;
        		}
        	}
    	}
    	return null;
    }
    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }  
    @Override
    public User update(User user) {
        user.setRoles(user.getRoles());
        return userRepository.save(user);
    }

}