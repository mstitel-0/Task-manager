package com.mstitel.timemanager.Repositories;

import com.mstitel.timemanager.Models.Task;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    Boolean existsByName(String name);
    Optional<Task> findById(ObjectId objectId);
    List<Task> findByUserId(ObjectId userId);
    List<Task> findByNameRegexAndUserId(Pattern regex, ObjectId userId);


}
