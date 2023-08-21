package com.mstitel.timemanager.Task;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    Boolean existsByName(String name);

    @Override
    Optional<Task> findById(ObjectId objectId);

    List<Task> findByUserId(ObjectId userId);
}
