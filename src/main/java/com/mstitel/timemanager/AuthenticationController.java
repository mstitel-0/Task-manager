package com.mstitel.timemanager;

import com.mstitel.timemanager.Requests.LoginRequest;
import com.mstitel.timemanager.Requests.SignUpRequest;
import com.mstitel.timemanager.Responses.JwtResponse;
import com.mstitel.timemanager.Responses.MessageResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

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

            @PostMapping("/signin")
            public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){

                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtils.generateJwtToken(authentication);

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

                return ResponseEntity.ok(new JwtResponse(
                        jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail()
                ));
            }

            @PostMapping("/signup")
            public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){

                if (userRepository.existsByUsername(signUpRequest.getUsername())){
                    return ResponseEntity.badRequest().body(new MessageResponse("Username is already in use!"));
                }
                if (userRepository.existsByEmail(signUpRequest.getEmail())){
                    return ResponseEntity.badRequest().body(new MessageResponse("Email is already taken!"));
                }

                User user = new User(signUpRequest.getUsername(),signUpRequest.getEmail(),signUpRequest.getPassword());
                userRepository.save(user);

                return ResponseEntity.ok(new MessageResponse("User registered!"));
            }
}
