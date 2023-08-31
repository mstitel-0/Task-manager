package com.mstitel.timemanager.Authentication.EmailConfirmation;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, ObjectId> {
        @Override
        Optional<ConfirmationToken> findById(ObjectId objectId);

        Optional<ConfirmationToken> findByToken(String token);

}
