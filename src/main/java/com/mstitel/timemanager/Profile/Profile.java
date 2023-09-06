package com.mstitel.timemanager.Profile;

import com.mstitel.timemanager.Task.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "profile")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile {

    @Id
    private ObjectId id;

    @NotBlank
    private ObjectId userId;

    private ArrayList<Task> lastCompletedTasks;

    @NotBlank
    @Size(min = 2, max = 20)
    private String name;

    @Size(min= 2,  max = 20)
    private String surname;

    @Size(min = 10, max = 150)
    private String bio;

    private int amountOfCompletedTasks;

    private String profilePictureUrl;

    public void updateTasksList(Task task){
        if (this.lastCompletedTasks == null || this.lastCompletedTasks.size() <= 2){
            this.lastCompletedTasks.add(task);
        }else {
            this.lastCompletedTasks.remove(0);
            this.lastCompletedTasks.add(task);
        }
    }

}
