package com.wpu.demo;

import service.ConnectDB;

import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.sql.*;

import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@RestController
public class restfulapi {

    // 학교 목록 제공
    @CrossOrigin
    @RequestMapping(value = "/schoollist", method = RequestMethod.GET)
    public String getschoolinfo() throws SQLException
    {
        String result = "";

        Connection con = ConnectDB.Create_Connection();
        Statement stmt = con.createStatement();
        ResultSet rs = null;

        try {
            Charset.forName("UTF-8");
            StringBuilder sb = new StringBuilder();

            sb.append("SELECT JSON_ARRAYAGG( " +
                    "    JSON_OBJECT( " +
                    "        'INDEX', school_id, " +
                    "        'UNIV_NAME', schoolname, " +
                    "        'SLOGEN', slogen, " +
                    "        'ADMISSIOON_URL', admissionurl, " +
                    "        'GRADUATION', graduation, " +
                    "        'ADDRESS', address, " +
                    "        'UNIV_CODE', district " +
                    "    ) " +
                    ") AS json_result " +
                    "FROM school_tb; ");
            rs = stmt.executeQuery(sb.toString());

            while (rs.next()) {
                result = rs.getString(1);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}