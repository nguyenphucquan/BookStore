package com.example.demo.jwt;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Cart;
import com.example.demo.entity.User;
import com.example.demo.service.impl.CartService;
import com.example.demo.service.impl.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class JWTController {
	
	@Autowired
    private JWTService jwtService;
    @Autowired
	private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody JWTAuthenticationRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassWord())
        );
        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // Lấy thông tin idUser từ cơ sở dữ liệu
            User user = userService.getUserByUserName(authRequest.getUserName());
            Long idUser = user.getId();
;           Cart cart = cartService.getCart(idUser);
            String token = jwtService.generateToken(userDetails);
            String role = extractRoleFromUserDetails(userDetails);

            Map<String, Object> response = new HashMap<>();
            
            response.put("token", token);
            response.put("role", role);
            response.put("idUser",idUser);
            response.put("cart",cart);

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    
    private String extractRoleFromUserDetails(UserDetails userDetails) {
        return userDetails.getAuthorities().iterator().next().getAuthority();
    }
}
