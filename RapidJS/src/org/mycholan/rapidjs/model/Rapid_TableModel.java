package org.mycholan.rapidjs.model;

import java.util.ArrayList;

/**
 * @author Saravana Kumar K
 * @purpose Model class for the meta- data for single DB-Table
 * @param tablename
 */
public class Rapid_TableModel {
     private String tablename;
     private ArrayList<String> type;
     private ArrayList<String> column;
     private ArrayList<Rapid_RowValueModel> values;

     public Rapid_TableModel() {
          super();
     }

     public Rapid_TableModel(String tablename, ArrayList<String> type, ArrayList<String> column,
               ArrayList<Rapid_RowValueModel> values) {
          super();
          this.tablename = tablename;
          this.type = type;
          this.column = column;
          this.values = values;
     }

     public String getTablename() {
          return tablename;
     }

     public void setTablename(String tablename) {
          this.tablename = tablename;
     }

     public ArrayList<String> getType() {
          return type;
     }

     public void setType(ArrayList<String> type) {
          this.type = type;
     }

     public ArrayList<String> getColumn() {
          return column;
     }

     public void setColumn(ArrayList<String> column) {
          this.column = column;
     }

     public ArrayList<Rapid_RowValueModel> getValues() {
          return values;
     }

     public void setValues(ArrayList<Rapid_RowValueModel> values) {
          this.values = values;
     }
}
