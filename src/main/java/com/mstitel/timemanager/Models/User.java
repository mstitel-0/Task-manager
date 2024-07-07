package com.mstitel.timemanager.Models;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;
    @Size(min = 5, max = 20, message = "Too many characters in the name field")
    private String username;
    @Size(min = 8, max = 40, message = "Too many characters in the email field")
    private String email;
    private String password;

    private Boolean isLocked = false;

    private Boolean isEnabled = false;


    public User(String userName, String email, String password) {
        this.username = userName;
        this.email = email;
        this.password = password;
    }

    public ObjectId getId() {
        return id;
    }
}
