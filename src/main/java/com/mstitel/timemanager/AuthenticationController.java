package com.mstitel.timemanager;

import com.mstitel.timemanager.Requests.LoginRequest;
import com.mstitel.timemanager.Requests.SignUpRequest;
import com.mstitel.timemanager.Responses.JwtResponse;
import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.User.CustomUserDetails;
import com.mstitel.timemanager.User.User;
import com.mstitel.timemanager.User.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

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

            private SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

            @PostMapping("/signin")
            public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){

                if(loginRequest.getUsername().equals("") || loginRequest.getPassword().equals("")){
                    return ResponseEntity.badRequest().body(new MessageResponse("Empty field"));
                }

                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtils.generateJwtToken(authentication);

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                return ResponseEntity.ok(new JwtResponse(
                        jwt, userDetails.getId().toString(), userDetails.getUsername(), userDetails.getEmail()
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
                if(signUpRequest.getUsername().equals("") || signUpRequest.getEmail().equals("") || signUpRequest.getPassword().equals("")){
                    return ResponseEntity.badRequest().body(new MessageResponse("Empty field"));
                }

                User user = new User(signUpRequest.getUsername(),signUpRequest.getEmail(),encoder.encode(signUpRequest.getPassword()));
                userRepository.save(user);

                return ResponseEntity.ok(new MessageResponse("User registered!"));
            }
            @PostMapping("/logout")
            public ResponseEntity<?> performLogout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
                this.logoutHandler.logout(request, response, authentication);
                return ResponseEntity.ok(new MessageResponse("Successful logout"));
            }
}
