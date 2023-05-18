package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

@Configuration
@EnableWebSecurity
public class LibrarySecurityConfig {

	private static final String[] SECURED_URLs = { "/books/**" };

	private static final String[] UN_SECURED_URLs = { "/books/all", "/books/book/{id}", "/users/**" };

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
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
		http.headers(t -> t.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true"))
				.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "http://localhost:3000"))
				.addHeaderWriter(
						new StaticHeadersWriter("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"))
				.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers",
						"Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization")));
		return http.csrf().disable().authorizeHttpRequests().requestMatchers(UN_SECURED_URLs).permitAll().and()
				.authorizeHttpRequests().requestMatchers(SECURED_URLs).hasAuthority("ADMIN").anyRequest()
				// .authenticated().and().httpBasic().and().build();
				.authenticated().and().formLogin(login -> login.loginPage("http://localhost:3000/login")
						.defaultSuccessUrl("http://localhost:3000/hello"))
				.build();
		// .authenticated().and().formLogin(login->login.loginPage("http://localhost:3000/login")).build();

	}
}
