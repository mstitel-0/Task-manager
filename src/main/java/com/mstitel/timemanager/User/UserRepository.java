package com.mstitel.timemanager.User;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository  extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);


    Optional<User> findById(ObjectId id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
