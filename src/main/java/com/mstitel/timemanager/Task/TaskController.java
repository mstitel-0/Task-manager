package com.mstitel.timemanager.Task;

import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.User.CustomUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody Task task){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
        task.setUserId(user.getId());
        taskService.addTask(task);
        return new ResponseEntity<>(new MessageResponse("Task added successfully"),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTask(@PathVariable ObjectId id){
        return new ResponseEntity<>(taskService.singleTask(id),HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTask(@RequestBody Task task) throws Exception {
        taskService.updateTask(task);
        return new ResponseEntity<>("Task updated successfully",HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable ObjectId id){
        taskService.deleteTask(id);
        return new ResponseEntity<String>("Task deleted",HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskDTO>> getAllTasks(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
        return new ResponseEntity<>(taskService.allTasks(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<TaskDTO>> searchByName(@PathVariable String name){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
        return new ResponseEntity<>(taskService.searchTasks(name, user.getId()), HttpStatus.OK);
    }

    @PostMapping("/update/{id}/status")
    public ResponseEntity<String> updateTaskStatus(@PathVariable ObjectId id) throws Exception {
        taskService.updateTaskStatus(id);
        return new ResponseEntity<>("Status updated", HttpStatus.OK);
    }
}
