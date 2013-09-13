package org.mycholan.rapidjs.utils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.model.Rapid_FactoryMetaData;
import org.mycholan.rapidjs.session.RapidContext;

/**
 * 
 * @author saravana
 * @usage construct sql query dynamically (using factory and meta objects)
 *
 */
public class Rapid_DataAccessUtils {
	static Logger log = Logger.getLogger(Rapid_DataAccessUtils.class);
	
	public String GetSelectQuery(String table, ArrayList<String> columns, ArrayList<String> whereKeys, ArrayList<String> keyValues) {
		return "";
	}

	public Properties FetchSingleRow(String table, Rapid_ApplicationMetaData AppMetaObj, ResultSet rs) {
		Properties Row = null;
		for (int i = 0; i < AppMetaObj.getAppMetaData().size(); i++) {
			if (AppMetaObj.getAppMetaData().get(i).getTablename().equals(table)) {
				try {
					while (rs.next()) {
						Row = new Properties();
						for (int j = 0; j < AppMetaObj.getAppMetaData().get(i).getColumn().size(); j++) {
							if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
								Row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										rs.getString(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim()));
							} else if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("INT")) {
								Row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getInt(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim())));
							} else if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
								Row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getBoolean(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim())));
							}
						}
					}
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return Row;
	}

	public ArrayList<Properties> FetchMultiRow(String table, Rapid_ApplicationMetaData AppMetaObj, ResultSet rs) {
		ArrayList<Properties> MultiRow = new ArrayList<Properties>();
		Properties row = null;

		for (int i = 0; i < AppMetaObj.getAppMetaData().size(); i++) {
			if (AppMetaObj.getAppMetaData().get(i).getTablename().equals(table)) {
				try {
					while (rs.next()) {
						row = new Properties();
						for (int j = 0; j < AppMetaObj.getAppMetaData().get(i).getColumn().size(); j++) {
							if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
								row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										rs.getString(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim()));
							} else if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("INT")) {
								row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getInt(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim())));
							} else if (AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
								row.setProperty(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getBoolean(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim())));
							}
						}
						MultiRow.add(row);
					}
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return MultiRow;
	}

	public Properties FetchSingleRow(String table, Rapid_FactoryMetaData FactoryMetaObj, ResultSet rs) {
		Properties Row = null;
		for (int i = 0; i < FactoryMetaObj.getFactoryMetaData().size(); i++) {
			if (FactoryMetaObj.getFactoryMetaData().get(i).getTablename().equals(table)) {
				try {
					while (rs.next()) {
						Row = new Properties();
						for (int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size(); j++) {
							if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
								Row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										rs.getString(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim()));
							} else if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("INT")) {
								Row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getInt(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim())));
							} else if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
								Row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getBoolean(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim())));
							}
						}
					}
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return Row;
	}

	public ArrayList<Properties> FetchMultiRow(String table, Rapid_FactoryMetaData FactoryMetaObj, ResultSet rs) {
		ArrayList<Properties> MultiRow = new ArrayList<Properties>();
		Properties row = null;

		for (int i = 0; i < FactoryMetaObj.getFactoryMetaData().size(); i++) {
			if (FactoryMetaObj.getFactoryMetaData().get(i).getTablename().equals(table)) {
				try {
					while (rs.next()) {
						row = new Properties();
						for (int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size(); j++) {
							if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
								row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										rs.getString(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim()));
							} else if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("INT")) {
								row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getInt(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim())));
							} else if (FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
								row.setProperty(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim(),
										String.valueOf(rs.getBoolean(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim())));
							}
						}
						MultiRow.add(row);
					}
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return MultiRow;
	}

	public String ConstructSelectQuery(String table, Rapid_ApplicationMetaData AppMetaObj) {
		String query = "SELECT ";
		for (int i = 0; i < AppMetaObj.getAppMetaData().size(); i++) {
			for (int j = 0; j < AppMetaObj.getAppMetaData().get(i).getColumn().size(); j++) {
				if (table.equals(AppMetaObj.getAppMetaData().get(i).getTablename())) {
					if (j != AppMetaObj.getAppMetaData().get(i).getColumn().size() - 1) {
						query += AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim() + ", ";
					} else {
						query += AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim();
					}
				}
			}
		}
		query += " FROM " + table;
		log.info("Constructed SELECT QUERY  =  " + query);
		return query;
	}

	public String ConstructSelectQuery(String table, Rapid_FactoryMetaData FactoryMetaObj) {
		String query = "SELECT ";
		for (int i = 0; i < FactoryMetaObj.getFactoryMetaData().size(); i++) {
			for (int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size(); j++) {
				if (table.equals(FactoryMetaObj.getFactoryMetaData().get(i).getTablename())) {
					if (j != FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size() - 1) {
						query += FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim() + ", ";
					} else {
						query += FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim();
					}
				}
			}
		}
		query += " FROM " + table;
		log.info("Constructed SELECT QUERY  =  " + query);
		return query;
	}

	public String ConstructSelectQuery_App(String t_name, String name, int value, Rapid_ApplicationMetaData AppMetaObj) {
		String query = "SELECT ";
		for (int i = 0; i < AppMetaObj.getAppMetaData().size(); i++) {
			if (t_name.equals(AppMetaObj.getAppMetaData().get(i).getTablename())) {
				for (int j = 0; j < AppMetaObj.getAppMetaData().get(i).getColumn().size(); j++) {
					if (j != AppMetaObj.getAppMetaData().get(i).getColumn().size() - 1) {
						query += AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim() + ", ";
					} else {
						query += AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim();
					}
				}
			}
		}

		query += " FROM " + t_name;
		query += " WHERE " + name + " = " + value;
		return query;
	}

	public String ConstructSelectQuery_Factory(String t_name, String name, int value, Rapid_FactoryMetaData FactoryMetaObj) {
		String query = "SELECT ";
		for (int i = 0; i < FactoryMetaObj.getFactoryMetaData().size(); i++) {
			if (t_name.equals(FactoryMetaObj.getFactoryMetaData().get(i).getTablename())) {
				for (int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size(); j++) {
					if (j != FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size() - 1) {
						query += FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim() + ", ";
					} else {
						query += FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim();
					}
				}
			}
		}

		query += " FROM " + t_name;
		query += " WHERE " + name + " = " + value;
		return query;
	}
	
	public String CreateTableSqlStatement(String table, Rapid_ApplicationMetaData AppMetaObj) {				
		String query = "CREATE TABLE " + table + " (";
		for(int i = 0; i < AppMetaObj.getAppMetaData().size(); i++) {
			if(AppMetaObj.getAppMetaData().get(i).getTablename().equals(table)) {
				for(int j = 0; j < AppMetaObj.getAppMetaData().get(i).getColumn().size(); j++) {
					query += AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim();
					
					if(AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("INT")) {
						query += " INTEGER";
					}else if(AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
						query += " "+AppMetaObj.getAppMetaData().get(i).getType().get(j).trim();
					}else if(AppMetaObj.getAppMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
						query += " BOOLEAN";
					}
					
					if(AppMetaObj.getAppMetaData().get(i).getColumn().get(j).trim().equals("ID")) {
						query += " NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1)";
					}
					
					if(j != AppMetaObj.getAppMetaData().get(i).getColumn().size() - 1) {
						query += ", ";
					}
				}
				
				if(AppMetaObj.getAppMetaData().get(i).getRelation().getPrimary() != null) {
					query += ", PRIMARY KEY (ID)";
				}
				
				for(int j = 0; j < AppMetaObj.getAppMetaData().get(i).getRelation().getForeign().size(); j++) {
					query += ", FOREIGN KEY (" + AppMetaObj.getAppMetaData().get(i).getRelation().getForeign().get(j).getSource_key() + ")";
					query += " REFERENCES " + AppMetaObj.getAppMetaData().get(i).getRelation().getForeign().get(j).getDestination_table();
					query += " (" + AppMetaObj.getAppMetaData().get(i).getRelation().getForeign().get(j).getDestination_key() + ")";
				}
			}
		}
		query += ")";
		log.info("Constructed Create Table Satement  =  " + query);
		return query;
	}	
	
	public String CreateTableSqlStatement(String table, Rapid_FactoryMetaData FactoryMetaObj) {
		String query = "CREATE TABLE " + table + " (";
		for(int i = 0; i < FactoryMetaObj.getFactoryMetaData().size(); i++) {
			if(FactoryMetaObj.getFactoryMetaData().get(i).getTablename().equals(table)) {
				for(int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size(); j++) {
					query += FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim();
					
					if(FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("INT")) {
						query += " INTEGER";
					}else if(FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().indexOf("VARCHAR") != -1) {
						query += FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim();
					}else if(FactoryMetaObj.getFactoryMetaData().get(i).getType().get(j).trim().equals("BOOLEAN")) {
						query += " BOOLEAN";
					}
					
					if(FactoryMetaObj.getFactoryMetaData().get(i).getColumn().get(j).trim().equals("ID")) {
						query += " NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1) ";
					}
					
					if(j != FactoryMetaObj.getFactoryMetaData().get(i).getColumn().size() - 1) {
						query += ",";
					}
				}
				
				if(FactoryMetaObj.getFactoryMetaData().get(i).getRelation().getPrimary() != null) {
					query += ", PRIMARY KEY (ID)";
				}
				
				for(int j = 0; j < FactoryMetaObj.getFactoryMetaData().get(i).getRelation().getForeign().size(); j++) {
					query += ", FOREIGN KEY (" + FactoryMetaObj.getFactoryMetaData().get(i).getRelation().getForeign().get(j).getSource_key() + ")";
					query += " REFERENCES" + FactoryMetaObj.getFactoryMetaData().get(i).getRelation().getForeign().get(j).getDestination_table();
					query += " (" + FactoryMetaObj.getFactoryMetaData().get(i).getRelation().getForeign().get(j).getDestination_key() + ")";
				}
			}
		}
		query += ")";
		log.info("Constructed Create Table Satement  =  " + query);
		return query;
	}
	
	public ArrayList<Properties> GetKeyValueMap(RapidContext rcontext) {
		
		return null;
	}
}
