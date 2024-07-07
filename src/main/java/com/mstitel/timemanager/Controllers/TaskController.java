package com.mstitel.timemanager.Controllers;

import com.mstitel.timemanager.DTOs.TaskDTO;
import com.mstitel.timemanager.Models.Task;
import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.Services.TaskService;
import com.mstitel.timemanager.Models.TaskStatus;
import com.mstitel.timemanager.Models.CustomUserDetails;

import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task){
        Date currentDate = new Date();
        if (task.getEndDate() == null){
            task.setStatus(TaskStatus.WAITING);
            task.setEndDate(null);
        }
        if(task.getEndDate() != null && task.getEndDate().before(currentDate)){
            return ResponseEntity.badRequest().body(new MessageResponse("Incorrect date"));
        }
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
    public ResponseEntity<?> deleteTask(@PathVariable ObjectId id){
        taskService.deleteTask(id);
        return new ResponseEntity<>("Task deleted",HttpStatus.OK);
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

    @PostMapping("/update/{id}/done")
    public ResponseEntity<?> updateTaskStatusDone(@PathVariable ObjectId id) throws Exception {
        taskService.updateTaskDone(id);
        return new ResponseEntity<>("Status updated", HttpStatus.OK);
    }
    @PostMapping("update/{id}/start")
    public ResponseEntity<?> updateTaskStatusInProgress(@PathVariable ObjectId id,@RequestBody Task task) throws Exception{
        taskService.updateTaskInProgress(id, task.getEndDate());
        return new ResponseEntity<>("Status updated", HttpStatus.OK);
    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<List<TaskDTO>>getCompletedTasks(@PathVariable ObjectId id) throws Exception {
        return new ResponseEntity<>(taskService.getCompletedTasks(id),HttpStatus.OK);
    }
}
