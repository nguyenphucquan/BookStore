package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.jwt.JWTAuthenticationFilter;

@CrossOrigin
@Configuration
@EnableWebSecurity
public class LibrarySecurityConfig {

	private static final String[] SECURED_URLs_ADMIN = {"api/book/save/**"};
	
	private static final String[] SECURED_URLs_USER = {};

	private static final String[] UN_SECURED_URLs = {"/api/login", 
													"/api/register", 
													 "/api/books", 
													 "/api/book/**",
													 "/logout",
													 "/carts/create",
													 "/carts/add/items",
													 "/carts/get",
													 "/carts/all",
													 "/carts/**",
													 "/carts/get/item",
													 "api/users",
													 "/cartitems/**",
													 };

	@Autowired
	private JWTAuthenticationFilter authenticationFilter;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public LibraryUserDetailsService userDetailsService() {
		return new LibraryUserDetailsService();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService()); 	
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.sessionManagement(a -> a.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
		http.formLogin(login->login.loginPage("http://localhost:3000/login"));
		http.logout(logout -> logout.logoutUrl("http://localhost:8080/api/logout"));

 
        return http.csrf().disable()
        		.authorizeHttpRequests()
        		.requestMatchers(UN_SECURED_URLs)
        		.permitAll().and()
        	//	.authorizeHttpRequests()
        	//	.requestMatchers(SECURED_URLs_USER).hasAuthority("USER").and()
				.authorizeHttpRequests()
				.requestMatchers(SECURED_URLs_ADMIN).hasAuthority("ADMIN")
				.anyRequest()
				.authenticated().and().httpBasic().and().build();

	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

}