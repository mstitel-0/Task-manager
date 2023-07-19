package com.mstitel.timemanager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
            @Autowired
            AuthenticationManager authenticationManager;

            @Autowired
            UserRepository userRepository;

            @Autowired
            PasswordEncoder encoder;

            @Autowired
            JwtUtils jwtUtils;

}
