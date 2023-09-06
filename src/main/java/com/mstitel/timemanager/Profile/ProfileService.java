package com.mstitel.timemanager.Profile;

import com.mstitel.timemanager.Task.Task;
import com.mstitel.timemanager.Task.TaskDTO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public void createProfile(String name,ObjectId userId){
        Profile profile = new Profile();
        profile.setName(name);
        profile.setUserId(userId);
        profile.setLastCompletedTasks(new ArrayList<>());
        profileRepository.save(profile);
    }

    public ProfileDTO getProfile(ObjectId id) throws Exception {
        Profile profile = profileRepository.findByUserId(id).orElseThrow(() -> new Exception("Profile not found"));
        ProfileDTO profileDTO = new ProfileDTO(profile.getId().toString(),profile.getUserId().toString(),profile.getLastCompletedTasks(),
                        profile.getName(),profile.getSurname(),profile.getBio(),profile.getAmountOfCompletedTasks(),profile.getProfilePictureUrl());
        return profileDTO;
    }

    public ProfileDTO openProfile(ObjectId id) throws Exception {
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new Exception("Not found"));
        ProfileDTO profileDTO = new ProfileDTO(profile.getId().toString(),profile.getUserId().toString(),profile.getLastCompletedTasks(),
                profile.getName(),profile.getSurname(),profile.getBio(),profile.getAmountOfCompletedTasks(),profile.getProfilePictureUrl());
        return profileDTO;
    }

    public void editProfile(Profile updatedProfile, ObjectId id) throws Exception {
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new Exception("Profile not found"));
        if (!updatedProfile.getName().equals("")){
            profile.setName(updatedProfile.getName());
        }
        if (!updatedProfile.getSurname().equals("")){
            profile.setSurname(updatedProfile.getSurname());
        }
        if (!updatedProfile.getBio().equals("")) {
            profile.setBio(updatedProfile.getBio());
        }
        profileRepository.save(profile);
    }

    public void setProfilePicture(String profilePicture, ObjectId id) throws Exception {
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new Exception("Profile not found"));
        profile.setProfilePictureUrl(profilePicture);
        profileRepository.save(profile);
    }

    public List<TaskDTO> getCompletedTasks(ObjectId id) throws Exception {
        Profile profile = profileRepository.findByUserId(id).orElseThrow(() -> new Exception("Not found"));
        List<Task> completedTasks = profile.getLastCompletedTasks();
        List<TaskDTO> taskDTOS = completedTasks.stream().map(task -> new TaskDTO(task.getId().toString(), task.getName(), task.getDescription(), task.getEndDate(), task.getStatus(), task.getUserId()))
                .collect(Collectors.toList());
        return taskDTOS;
    }
}
