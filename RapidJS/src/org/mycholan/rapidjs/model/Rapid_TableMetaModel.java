package org.mycholan.rapidjs.model;

import java.util.ArrayList;

/**
 * 
 * @author saravana
 * @purpose used to hold "table" section values from core json files. contains all table names, there column names and there types. 
 *
 */
public class Rapid_TableMetaModel {
	private String tablename;
	private ArrayList<String> type;
	private ArrayList<String> column;
	private Rapid_TableRelation relation;

	public Rapid_TableMetaModel() {
		super();
	}

	public Rapid_TableMetaModel(String tablename, ArrayList<String> type,
			ArrayList<String> column,  Rapid_TableRelation relation) {
		super();
		this.tablename = tablename;
		this.type = type;
		this.column = column;
		this.relation = relation;
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
	public Rapid_TableRelation getRelation() {
		return relation;
	}
	public void setRelation(Rapid_TableRelation relation) {
		this.relation = relation;
	}	
}
