package com.mstitel.timemanager.Controllers;

import com.mstitel.timemanager.Models.Profile;
import com.mstitel.timemanager.DTOs.ProfileDTO;
import com.mstitel.timemanager.Services.ProfileService;
import com.mstitel.timemanager.Responses.MessageResponse;
import com.mstitel.timemanager.DTOs.TaskDTO;
import com.mstitel.timemanager.Models.CustomUserDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/get")
    public ResponseEntity<ProfileDTO>getProfile() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();

        return new ResponseEntity<>(profileService.getProfile(user.getId()), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public  ResponseEntity<ProfileDTO>openProfile(@PathVariable ObjectId id) throws Exception {
        return new ResponseEntity<>(profileService.openProfile(id),HttpStatus.OK);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<?>editProfile(@RequestBody Profile profile, @PathVariable ObjectId id) throws Exception {
        profileService.editProfile(profile, id);
        return ResponseEntity.ok(new MessageResponse("Profile successfully edited"));
    }

    @PostMapping("/{id}/picture")
    public ResponseEntity<?>setProfilePicture(@RequestParam("image") MultipartFile imageFile, @PathVariable ObjectId id) throws Exception {

        profileService.setProfilePicture(imageFile, id);

        return ResponseEntity.ok(new MessageResponse("pfp updated"));
    }
}
