package com.wpu.demo.service;

import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Service
public class SchoolService {
    public String getSchoolList() {
        StringBuilder jsonArray = new StringBuilder();
        jsonArray.append("[");

        Connection con = ConnectDB.Create_Connection();
        Statement stmt = null;
        ResultSet rs = null;

        try {
            stmt = con.createStatement();
            String query = "SELECT JSON_OBJECT(" +
                    "'INDEX', s.school_id, " +
                    "'UNIV_NAME', s.schoolname, " +
                    "'UNIV_CODE', s.district, " +
                    "'DEPARTMENT', d.department " +
                    ") AS json_result " +
                    "FROM school_tb s " +
                    "LEFT JOIN department_tb d ON s.school_id = d.school_id;";

            rs = stmt.executeQuery(query);

            while (rs.next()) {
                if (jsonArray.length() > 1) {
                    jsonArray.append(",");
                }
                jsonArray.append(rs.getString("json_result"));
            }
            jsonArray.append("]");
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

        return jsonArray.toString();
    }

    public String getSchoolinfo(Integer school_num) {
        if (school_num == null || school_num == 0) return "ID ERROR";

        StringBuilder jsonArray = new StringBuilder();
        jsonArray.append("[");

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
                    "FROM school_tb WHERE `school_id`=" + school_num + ";";

            rs = stmt.executeQuery(query);

            while (rs.next()) {
                if (jsonArray.length() > 1) {
                    jsonArray.append(",");
                }
                jsonArray.append(rs.getString("json_result"));
            }
            jsonArray.append("]");
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

        return jsonArray.toString();
    }

    public String getdepartment(Integer school_num) {
        if (school_num == null || school_num == 0) return "ID ERROR";

        StringBuilder jsonArray = new StringBuilder();
        jsonArray.append("[");

        Connection con = ConnectDB.Create_Connection();
        Statement stmt = null;
        ResultSet rs = null;

        try {
            stmt = con.createStatement();
            String query = "SELECT JSON_OBJECT( " +
                    "'DEPARTMENT', department, " +
                    "'DEPARTMENT_RECRUITED', department_recruited, " +
                    "'DEPARTMENT_DEGREE', department_degree " +
                    ") AS json_result " +
                    "FROM department_tb WHERE `school_id`=" + school_num + ";";

            rs = stmt.executeQuery(query);

            while (rs.next()) {
                if (jsonArray.length() > 1) {
                    jsonArray.append(",");
                }
                jsonArray.append(rs.getString("json_result"));
            }
            jsonArray.append("]");
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

        return jsonArray.toString();
    }
}
