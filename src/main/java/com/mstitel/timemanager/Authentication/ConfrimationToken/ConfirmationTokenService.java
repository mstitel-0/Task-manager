package com.mstitel.timemanager.Authentication.ConfrimationToken;

import com.mstitel.timemanager.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDateTime;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private UserService userService;

    public void saveConfirmationToken(ConfirmationToken confirmationToken){
        confirmationTokenRepository.save(confirmationToken);
    }
    public void setConfirmedAt(String token) throws Exception {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token).orElseThrow(()->new Exception("Token is not found"));
        confirmationToken.setConfirmedAt(LocalDateTime.now());
        confirmationTokenRepository.save(confirmationToken);
    }
    @Transactional
    public RedirectView confirmToken(String token) throws Exception {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token).orElseThrow(() -> new Exception("Token is not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new Exception("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new Exception("Token expired");
        }

        setConfirmedAt(token);
        userService.enableUser(
                confirmationToken.getUserId());
        return new RedirectView("http://localhost:3000/login");
    }

}
