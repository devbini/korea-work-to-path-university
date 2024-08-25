package com.wpu.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wpu.demo.service.SchoolService;

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
    public String getSchoolList() {
        return schoolService.getSchoolList();
    }

    @CrossOrigin
    @GetMapping("/schoolinfo")
    public String getSchoolList(@RequestParam(required = false) Integer school_id) {
        return schoolService.getSchoolinfo(school_id);
    }

    @CrossOrigin
    @GetMapping("/department")
    public String getDepartmentList(@RequestParam(required = false) Integer school_id) {
        return schoolService.getdepartment(school_id);
    }

    @CrossOrigin
    @GetMapping("/")
    public String testConnection() {
        return "School-Connect-Test";
    }
}
