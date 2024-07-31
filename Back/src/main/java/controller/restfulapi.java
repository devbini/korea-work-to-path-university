package com.wpu.demo;

import service.ConnectDB;

import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@RestController
public class restfulapi {
    // 학교 목록 제공
    @CrossOrigin
    @RequestMapping(value = "/schoollist", method = RequestMethod.GET)
    public List<Map<String, Object>> getsmplist() throws SQLException
    {
        List<Map<String, Object>> i1 = new ArrayList<>();

        Connection con = ConnectDB.Create_Connection();
        Statement stmt = con.createStatement();
        ResultSet rs = null;

        try {
            Charset.forName("UTF-8");
            StringBuilder sb = new StringBuilder();

            sb.append("SELECT * FROM university_tb;");
            rs = stmt.executeQuery(sb.toString());

            while (rs.next()) {
                Map<String, Object> m1 = new HashMap<>();
                Map<String, Object> m2 = new HashMap<>();

                m2.put("INDEX", rs.getString(1));
                m2.put("UNIV_NAME", rs.getString(2));
                m2.put("UNIV_CODE", rs.getString(3));

                m1.put("info", m2);

                i1.add(m1);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return i1;
    }

    // 학교 목록 제공
    @CrossOrigin
    @RequestMapping(value = "/schoolliststring", method = RequestMethod.GET)
    public String getsmpliststring() throws SQLException
    {
        String result = "";

        Connection con = ConnectDB.Create_Connection();
        Statement stmt = con.createStatement();
        ResultSet rs = null;

        try {
            Charset.forName("UTF-8");
            StringBuilder sb = new StringBuilder();

            sb.append("SELECT JSON_OBJECT('UNIV', JSON_ARRAYAGG(JSON_OBJECT( 'INDEX', `INDEX`, 'NAME', `NAME`, 'URL', `URL`, 'SLOGEN', `SLOGEN`, 'ADDRESS', `ADDRESS`, " +
                    "'PRICE', `PRICE`, 'ENDIF', `ENDIF`, 'INTERVIEWTYPEA', `INTERVIEWTYPEA`, 'GPA', `GPA`, 'DEPARTMENT', `DEPARTMENT`, " +
                    "'DEPARTMENTPERCENT', `DEPARTMENTPERCENT`, 'SECTOR', `SECTOR` ))) AS json_data " +
                    "FROM table_two;");
            rs = stmt.executeQuery(sb.toString());

            rs.next();

            result = rs.getString(1);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}