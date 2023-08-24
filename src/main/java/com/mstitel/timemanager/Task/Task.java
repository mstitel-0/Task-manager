package com.mstitel.timemanager.Task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private ObjectId id;

    private String name;

    private String description;
    private Date endDate;
    private TaskStatus status = TaskStatus.IN_PROGRESS;

    private ObjectId userId;

    public Task(String name, String description, Date endDate) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
    }
}
