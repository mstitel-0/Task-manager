package com.mstitel.timemanager;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.util.logging.Logger;
import java.security.Key;

@Component
public class JwtUtils {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(JwtUtils.class);

    @Value("${env.jwtSecret}")
    private String jwtPass ;

    @Value("${jwtExp}")
    private int jwtExpirationsMs = 86400000;

    public String generateJwtToken(Authentication authentication){

        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationsMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtPass));
    }


}
