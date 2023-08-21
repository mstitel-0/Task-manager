package com.mstitel.timemanager.Task;

public class TaskDTO {

    private String id;
    private String name;
    private double timeToComplete;

    public TaskDTO(String id, String name, double timeToComplete) {
        this.id = id;
        this.name = name;
        this.timeToComplete = timeToComplete;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getTimeToComplete() {
        return timeToComplete;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTimeToComplete(double timeToComplete) {
        this.timeToComplete = timeToComplete;
    }
}
