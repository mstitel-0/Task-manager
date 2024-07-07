package com.mstitel.timemanager.Security;

import com.mstitel.timemanager.Models.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


import java.util.Date;
import java.security.Key;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwtSecret}")
    private String jwtPass ;

    @Value("${jwtExp}")
    private int jwtExpirationsMs ;

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

    public String getUserNameFromJwtToken(String token){
        return Jwts.parserBuilder().setSigningKey(key())
                .build().parseClaimsJws(token)
                .getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
            return true;
        }
        catch (MalformedJwtException e){
            logger.error("Invalid token: {}" , e.getMessage());
        }
        catch (ExpiredJwtException e){
            logger.error("Token is expired: {}" , e.getMessage());
        }
        catch (UnsupportedJwtException e){
            logger.error("Unsupported token: {}" , e.getMessage());
        }
        catch (IllegalArgumentException e){
            logger.error("Token is empty: {} ", e.getMessage());
        }
        return false;
    }


}
