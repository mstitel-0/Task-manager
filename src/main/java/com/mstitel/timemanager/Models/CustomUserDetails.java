package com.mstitel.timemanager.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;
    private ObjectId id;
    private String email;
    private String username;

    @JsonIgnore
    private String password;

    private Boolean isLocked ;

    private Boolean isEnabled ;

    public CustomUserDetails(ObjectId id, String username, String email, String password, Boolean isLocked, Boolean isEnabled) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isLocked = isLocked;
        this.isEnabled = isEnabled;
    }

    public static CustomUserDetails build(User user){

        return new CustomUserDetails(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getIsLocked(),
                user.getIsEnabled());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public ObjectId getId() {
        return id;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    @Override
    public boolean equals(Object o){
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CustomUserDetails user = (CustomUserDetails) o;
        return Objects.equals(id,user.id);
    }
}
