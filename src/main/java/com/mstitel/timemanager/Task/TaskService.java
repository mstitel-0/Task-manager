package com.mstitel.timemanager.Task;
import java.util.List;
import java.util.Optional;

import com.mstitel.timemanager.Requests.AddTaskRequest;
import jakarta.validation.Valid;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public  List<Task> allTasks(ObjectId userId){

        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> singleTask(ObjectId id){
        return taskRepository.findById(id);
    }

    public void updateTask(Task updatedTask) throws Exception {
        Task taskToUpdate = taskRepository.findById(updatedTask.getId()).orElseThrow(()->new Exception("Task is not found"));
        taskToUpdate.setName(updatedTask.getName());
        taskToUpdate.setTimeToComplete(updatedTask.getTimeToComplete());
    }

    public Task addTask(@Valid @RequestBody AddTaskRequest addTaskRequest){
        Task task = new Task();
        task.setName(addTaskRequest.getName());
        task.setTimeToComplete(addTaskRequest.getTime());
        task.setUserId(addTaskRequest.getUserId());
        return taskRepository.save(task);
    }
    public void deleteTask(ObjectId id){
        taskRepository.deleteById(id);
    }
}
