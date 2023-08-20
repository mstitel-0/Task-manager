package com.mstitel.timemanager.Task;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    Boolean existsByName(String name);

    List<Task> findByUserId(ObjectId userId);
}
