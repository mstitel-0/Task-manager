package com.mstitel.timemanager.Task;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.mstitel.timemanager.Profile.Profile;
import com.mstitel.timemanager.Profile.ProfileRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public Task addTask(Task task){
        return taskRepository.save(task);
    }

    public Optional<Task> singleTask(ObjectId id){
        return taskRepository.findById(id);
    }

    public void updateTask(Task updatedTask) throws Exception {
        Task taskToUpdate = taskRepository.findById(updatedTask.getId()).orElseThrow(()->new Exception("Task is not found"));
        if (!updatedTask.getName().equals(""))
            taskToUpdate.setName(updatedTask.getName());
        if (!updatedTask.getDescription().equals(""))
            taskToUpdate.setDescription(updatedTask.getDescription());
        if (updatedTask.getEndDate() != null)
            taskToUpdate.setEndDate(updatedTask.getEndDate());
        taskRepository.save(taskToUpdate);
    }

    public void deleteTask(ObjectId id){
        taskRepository.deleteById(id);
    }

    public  List<TaskDTO> allTasks(ObjectId userId){
        List<Task> tasks = taskRepository.findByUserId(userId);
        List<TaskDTO> taskDTOs = tasks.stream()
                .map(task -> new TaskDTO(task.getId().toString(), task.getName(), task.getDescription(), task.getEndDate(), task.getStatus(), task.getUserId()))
                .collect(Collectors.toList());
        return taskDTOs;
    }

    public List<TaskDTO> searchTasks(String name, ObjectId userId){
        Pattern regexPattern = Pattern.compile(".*" + name + ".*", Pattern.CASE_INSENSITIVE);
        List<Task> tasks = taskRepository.findByNameRegexAndUserId(regexPattern, userId);
        List<TaskDTO> taskDTOS = tasks.stream()
                .map(task -> new TaskDTO(task.getId().toString(), task.getName(), task.getDescription(), task.getEndDate(), task.getStatus(), task.getUserId()))
                .collect(Collectors.toList());
        return taskDTOS;
    }

    public void updateTaskDone(ObjectId id) throws Exception {
        Task task = taskRepository.findById(id).orElseThrow(() -> new Exception("Task not found"));
        task.setStatus(TaskStatus.DONE);
        Profile profile = profileRepository.findByUserId(task.getUserId()).orElseThrow(() -> new Exception("Profile not found"));
        profile.updateTasksList(task);
        profile.setAmountOfCompletedTasks(profile.getAmountOfCompletedTasks()+1);
        profileRepository.save(profile);
        taskRepository.save(task);

    }

    public void updateTaskInProgress(ObjectId id, Date date) throws Exception{
        Task task = taskRepository.findById(id).orElseThrow(() -> new Exception("Task not found"));
        task.setStatus(TaskStatus.IN_PROGRESS);
        task.setEndDate(date);
        taskRepository.save(task);
    }

    @Scheduled(fixedRate = 3600)
    public void checkForExpiration(){
        Date currentDate = new Date();
        List<Task> tasks = taskRepository.findAll();

        for (Task task : tasks){
            if (task.getEndDate() != null && currentDate.after(task.getEndDate())){
                task.setStatus(TaskStatus.EXPIRED);
                taskRepository.save(task);
            }
        }
    }
}
