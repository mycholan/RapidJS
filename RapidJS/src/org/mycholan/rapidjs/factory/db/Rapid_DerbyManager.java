package org.mycholan.rapidjs.factory.db;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.mycholan.rapidjs.model.Rapid_TableModel;

public class Rapid_DerbyManager {
     static Logger log = Logger.getLogger(Rapid_DerbyManager.class);
     private String driver = null;
     private String protocol = null;

     private Connection conn = null;
     private Statement s = null;
     private ResultSet rs = null;

     private String dbName = null;
     Properties props = null;

     private ArrayList<String> AllTable = null;

     public Rapid_DerbyManager() {
          this.driver = "org.apache.derby.jdbc.EmbeddedDriver";
          this.protocol = "jdbc:derby:";
          this.dbName = "RapidJSDB";

          this.props = new Properties();
          this.props.put("user", "rj_user");
          this.props.put("password", "rj_password");
     }

     public boolean CreateTable(String qstr) {
          log.info("Routine : CreateTable, query to be executed : " + qstr);
          try {
               s = conn.createStatement();
               if (!s.execute(qstr)) {
                    log.info("Routine : CreateTable,  table created Successfully.");
                    conn.commit();
                    return true;
               }
          } catch (SQLException e) {
               log.info("Routine : CreateTable,  exception occured : " + e.getMessage());
               e.printStackTrace();
               CloseConnection();
               return false;
          }
          CloseConnection();
          return false;
     }

     public ResultSet ExecuteQuery(String qstr) {
          log.info("Routine : ExecuteQuery, The query about to execute : " + qstr);
          try {
               conn.setAutoCommit(true);
          } catch (SQLException e1) {
               log.error("Routine : ExecuteQuery, " + e1.getMessage());
               e1.printStackTrace();
          }
          ResultSet result = null;
          try {
               s = conn.createStatement();
               result = s.executeQuery(qstr);
          } catch (SQLException e) {
               System.out.println(e.getMessage());
               log.error("Routine : ExecuteQuery, " + e.getMessage());
               e.printStackTrace();
          }
          return result;
     }

     public boolean InsertFactory(Rapid_TableModel tbl_data) {
          PreparedStatement psInsert = null;
          int ColumnCount = tbl_data.getColumn().size();

          String query = "INSERT INTO " + tbl_data.getTablename() + " (";
          for (int i = 1; i < ColumnCount; i++) {
               if (ColumnCount - 1 == i) {
                    query += tbl_data.getColumn().get(i) + ") ";
               } else {
                    query += tbl_data.getColumn().get(i) + ", ";
               }
          }

          query += " VALUES (";

          for (int i = 1; i < ColumnCount; i++) {
               if (i == ColumnCount - 1) {
                    query += "? )";
               } else {
                    query += "?,";
               }
          }

          log.info("Routine : InsertFactory, query = " + query);
          try {
               GetConnection();
               for (int i = 0; i < tbl_data.getValues().size(); i++) {
                    psInsert = conn.prepareStatement(query);
                    for (int j = 0; j < tbl_data.getValues().get(i).getTvalue().size(); j++) {
                         if (tbl_data.getType().get(j + 1).equals("INT")) {
                              psInsert.setInt(
                                        j + 1,
                                        Integer.parseInt(tbl_data.getValues().get(i).getTvalue()
                                                  .get(j)));
                         } else if (tbl_data.getType().get(j + 1).equals("BOOLEAN")) {
                              if (tbl_data.getValues().get(i).getTvalue().get(j).equals("true")) {
                                   psInsert.setBoolean(j + 1, true);
                              } else {
                                   psInsert.setBoolean(j + 1, false);
                              }
                         } else {

                              psInsert.setString(j + 1, tbl_data.getValues().get(i).getTvalue()
                                        .get(j));
                         }
                    }
                    psInsert.executeUpdate();
                    conn.commit();
                    psInsert.close();
                    log.info("Routine : InsertFactory, query executed successfully");
               }

          } catch (SQLException e) {
               CloseConnection();
               log.error("Routine : InsertFactory, exception occurred" + e.getMessage());
               e.printStackTrace();
               return false;
          }

          CloseConnection();
          return true;
     }

     public void GetConnection() {
          loadDriver();
          try {
               conn = DriverManager.getConnection(this.protocol + this.dbName + ";create=true",
                         this.props);
               log.info("DB connection established Successfully");
               conn.setAutoCommit(false);
          } catch (SQLException sqle) {
               log.error("Routine : GetConnection, " + sqle.getMessage());
               sqle.printStackTrace();
          }
     }

     public void CloseConnection() {
          try {
               if (s != null) {
                    s.close();
               }

               if (rs != null) {
                    rs.close();
               }
               DriverManager.getConnection("jdbc:derby:;shutdown=true");
          } catch (SQLException se) {
               if (((se.getErrorCode() == 50000) && ("XJ015".equals(se.getSQLState())))) {
                    log.info("Derby shut down normally");
               } else {
                    log.info("Derby did not shut down normally");
                    se.printStackTrace();
               }
          }
     }

     private void loadDriver() {
          try {
               Class.forName(driver).newInstance();
          } catch (ClassNotFoundException cnfe) {
               log.info("\nUnable to load the JDBC driver " + driver);
               log.info("Please check your CLASSPATH.");
               cnfe.printStackTrace(System.err);
          } catch (InstantiationException ie) {
               log.info("\nUnable to instantiate the JDBC driver " + driver);
               ie.printStackTrace(System.err);
          } catch (IllegalAccessException iae) {
               log.info("\nNot allowed to access the JDBC driver " + driver);
               iae.printStackTrace(System.err);
          }
     }

     /**
      * @author Saravana Kumar K
      * @param table
      *             name of the table
      * @return false if table already exist
      */
     public boolean CheckIfTableExist(String table) {
          log.info("Check for pre existance of table " + table);
          try {
               if (AllTable == null) {
                    getTableList();
               }
               for (int i = 0; i < AllTable.size(); i++) {
                    if (table.toLowerCase().equals(AllTable.get(i).toLowerCase())) {
                         return false;
                    }
               }
          } catch (SQLException e) {
               log.info("Routine : CheckIfTableExist, exception occured " + e.getMessage());
               e.printStackTrace();
          }
          log.info(table + " is not there in DJDB");
          return true;
     }

     private void getTableList() throws SQLException {
          DatabaseMetaData dbmeta = conn.getMetaData();
          readDBTable(dbmeta, "TABLE", null);
          return;
     }

     private void readDBTable(DatabaseMetaData dbmeta, String searchCriteria, String schema)
               throws SQLException {
          AllTable = new ArrayList<String>();
          ResultSet rss = dbmeta.getTables(null, schema, null, new String[] { searchCriteria });
          while (rss.next()) {
               AllTable.add(rss.getString("TABLE_NAME").toLowerCase());
          }
          rss.close();
     }
}
