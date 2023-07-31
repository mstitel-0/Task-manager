package com.mstitel.timemanager.Task;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskService.allTasks(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> getTask(@PathVariable ObjectId id){
        return new ResponseEntity<>(taskService.singleTask(id),HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable ObjectId id){
        return new ResponseEntity<String>("Task deleted",HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTask(Task task){
        taskService.addTask(task);
        return new ResponseEntity<>("Task added successfully",HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTask(@RequestBody Task task) throws Exception {
        taskService.updateTask(task);
        return new ResponseEntity<>("Task updated successfully",HttpStatus.OK);
    }

}
