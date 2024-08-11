package com.wpu.demo.service;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class SchoolService {
    public List<String> getSchoolList() {
        List<String> schools = new ArrayList<>();
        Connection con = ConnectDB.Create_Connection();
        Statement stmt = null;
        ResultSet rs = null;

        try {
            stmt = con.createStatement();
            String query = "SELECT JSON_OBJECT( " +
                    "'INDEX', school_id, " +
                    "'UNIV_NAME', schoolname, " +
                    "'SLOGEN', slogen, " +
                    "'ADMISSION_URL', admissionurl, " +
                    "'GRADUATION', graduation, " +
                    "'ADDRESS', address, " +
                    "'UNIV_CODE', district " +
                    ") AS json_result " +
                    "FROM school_tb;";

            rs = stmt.executeQuery(query);

            while (rs.next()) {
                schools.add(rs.getString("json_result"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (con != null) con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return schools;
    }
}
