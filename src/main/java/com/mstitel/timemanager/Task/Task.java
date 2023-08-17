package com.mstitel.timemanager.Task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private ObjectId id;

    private String name;

    private double timeToComplete;

    private ObjectId userId;

    public Task(String name, double timeToComplete, ObjectId userId) {
        this.name = name;
        this.timeToComplete = timeToComplete;
        this.userId = userId;
    }
}
