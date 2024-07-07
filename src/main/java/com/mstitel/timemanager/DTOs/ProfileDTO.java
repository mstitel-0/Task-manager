package com.mstitel.timemanager.DTOs;

import com.mstitel.timemanager.Models.Task;

import java.util.ArrayList;

public class ProfileDTO {
    private String id;

    private String userId;

    private ArrayList<Task> lastCompletedTasks;

    private String name;

    private String surname;

    private String bio;

    private int amountOfCompletedTasks;

    private String profilePictureUrl;

    public ProfileDTO(String id, String userId, ArrayList<Task> lastCompletedTasks, String name, String surname, String bio, int amountOfCompletedTasks, String profilePictureUrl) {
        this.id = id;
        this.userId = userId;
        this.lastCompletedTasks = lastCompletedTasks;
        this.name = name;
        this.surname = surname;
        this.bio = bio;
        this.amountOfCompletedTasks = amountOfCompletedTasks;
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public ArrayList<Task> getLastCompletedTasks() {
        return lastCompletedTasks;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getBio() {
        return bio;
    }

    public int getAmountOfCompletedTasks() {
        return amountOfCompletedTasks;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setLastCompletedTasks(ArrayList<Task> lastCompletedTasks) {
        this.lastCompletedTasks = lastCompletedTasks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setAmountOfCompletedTasks(int amountOfCompletedTasks) {
        this.amountOfCompletedTasks = amountOfCompletedTasks;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }
}
