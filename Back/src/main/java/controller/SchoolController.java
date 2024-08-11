package com.wpu.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.SchoolService;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {

    private final SchoolService schoolService;

    @Autowired
    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @CrossOrigin
    @GetMapping("/list")
    public List<String> getSchoolList() {
        return schoolService.getSchoolList();
    }

    @CrossOrigin
    @GetMapping("/")
    public String testConnection() {
        return "School-Connect-Test";
    }
}
