package com.mstitel.timemanager.Task;

import com.mstitel.timemanager.Requests.AddTaskRequest;
import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.User.CustomUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Optional;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskService.allTasks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTask(@PathVariable ObjectId id){
        return new ResponseEntity<>(taskService.singleTask(id),HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable ObjectId id){
        taskService.deleteTask(id);
        return new ResponseEntity<String>("Task deleted",HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addTask(@Valid @RequestBody AddTaskRequest addTaskRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
        addTaskRequest.setUserId(user.getId());
        taskService.addTask(addTaskRequest);
        return new ResponseEntity<>(new MessageResponse("Task added successfully"),HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTask(@RequestBody Task task) throws Exception {
        taskService.updateTask(task);
        return new ResponseEntity<>("Task updated successfully",HttpStatus.OK);
    }

}
