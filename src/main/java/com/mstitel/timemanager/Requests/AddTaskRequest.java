package com.mstitel.timemanager.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.bson.types.ObjectId;

public class AddTaskRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Size(max = 24)
    private double time;

    @NotBlank
    private ObjectId userId;

    public String getName() {
        return name;
    }

    public double getTime() {
        return time;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }
}
