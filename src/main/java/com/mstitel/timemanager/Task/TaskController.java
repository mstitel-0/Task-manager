package com.mstitel.timemanager.Task;

import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.User.CustomUserDetails;

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
        if (task.getName().equals("") || task.getDescription().equals("")){
            return ResponseEntity.badRequest().body(new MessageResponse("Empty field(s)"));
        }
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
}
