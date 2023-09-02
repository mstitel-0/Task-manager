package com.mstitel.timemanager.Authentication.ConfrimationToken;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "confirmation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmationToken {
    @Id
    private ObjectId id;

    @NotBlank
    private String token;

    @NotBlank
    private LocalDateTime createdAt;

    @NotBlank
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

    private ObjectId userId;

    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiresAt, ObjectId userId) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.userId = userId;
    }
}
