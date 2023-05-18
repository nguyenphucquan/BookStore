package com.example.demo.config;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;



@Component
public class LibraryUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User myUser = userRepository.findByEmail(username);
               
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(myUser.getRoles()));
        return new org.springframework.security.core.userdetails.User(myUser.getEmail(),
                passwordEncoder.encode(myUser.getPassword()), authorities);
    }

}