package com.mstitel.timemanager.Authentication;

import com.mstitel.timemanager.Authentication.ConfrimationToken.ConfirmationToken;
import com.mstitel.timemanager.Authentication.ConfrimationToken.ConfirmationTokenService;
import com.mstitel.timemanager.Profile.ProfileService;
import com.mstitel.timemanager.User.User;
import com.mstitel.timemanager.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthenticationService {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Autowired
    private ProfileService profileService;

    public String register(User user){
        User newUser = new User(user.getUsername(),user.getEmail(),encoder.encode(user.getPassword()));
        userRepository.save(newUser);

        profileService.createProfile(newUser.getUsername(),newUser.getId());

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                newUser.getId()
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return confirmationToken.getToken();
    }
}
