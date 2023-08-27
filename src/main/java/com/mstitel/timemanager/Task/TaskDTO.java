package com.mstitel.timemanager.Task;

import org.bson.types.ObjectId;

import java.util.Date;

public class TaskDTO {

    private String id;
    private String name;

    private String description;
    private Date endDate;
    private TaskStatus status;

    private ObjectId userId;

    public TaskDTO(String id, String name, String description, Date endDate, TaskStatus status, ObjectId userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.status = status;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Date getEndDate() {
        return endDate;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }
}
