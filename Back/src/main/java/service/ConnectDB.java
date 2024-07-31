package service;

import io.github.cdimascio.dotenv.Dotenv;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectDB {
    public static Connection Create_Connection()
    {
        Connection con = null;

        Dotenv dotenv = Dotenv.configure()
                              .directory("/home/importent/")
                              .load();

        String SERVER = dotenv.get("DB_SERVER");
        String USER_NAME = dotenv.get("DB_USERNAME");
        String PASSWORD = dotenv.get("DB_PASSWORD");

        try{
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try{
            con = DriverManager.getConnection("jdbc:mysql://"+ SERVER + "/" + "mydb?useSSL=false&allowPublicKeyRetrieval=true",USER_NAME,PASSWORD);
        }catch(SQLException e){
            e.printStackTrace();
        }

        return con;
    }
}
