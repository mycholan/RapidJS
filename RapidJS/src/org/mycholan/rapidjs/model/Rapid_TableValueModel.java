package org.mycholan.rapidjs.model;

import java.util.ArrayList;

/**
 * 
 * @author saravana
 * @purpose Used to holds "init_value" section values from core json files. Contains all the initial rows of data to inserted in tables.
 *
 */
public class Rapid_TableValueModel {
	private String tableName;
	private ArrayList<Rapid_RowValueModel> tableValue;

	public Rapid_TableValueModel() {
		super();
	}

	public Rapid_TableValueModel(String tableName, ArrayList<Rapid_RowValueModel> tableValue) {
		super();
		this.tableName = tableName;
		this.tableValue = tableValue;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public ArrayList<Rapid_RowValueModel> getTableValue() {
		return tableValue;
	}

	public void setTableValue(ArrayList<Rapid_RowValueModel> tableValue) {
		this.tableValue = tableValue;
	}
}
