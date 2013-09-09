package org.mycholan.rapidjs.model;

import java.util.ArrayList;
import java.util.Properties;

/**
 * 
 * @author saravana
 * @purpose Model class for app.json file, Represents entire app.json file as a an object. 
 *
 */
public class Rapid_ApplicationMetaData {
	private ArrayList<Rapid_TableMetaModel> appMetaData;
	private ArrayList<Rapid_TableValueModel> appInitValue;
	private ArrayList<Properties> appTableRelation;
		
	public Rapid_ApplicationMetaData(
			ArrayList<Rapid_TableMetaModel> metaData,
			ArrayList<Rapid_TableValueModel> initValue,
			ArrayList<Properties> tableRelation) {
		super();
		appMetaData = metaData;
		appInitValue = initValue;
		appTableRelation = tableRelation;
	}

	public Rapid_ApplicationMetaData() {	}

	public ArrayList<Rapid_TableMetaModel> getAppMetaData() {
		return appMetaData;
	}
	
	public void setAppMetaData(ArrayList<Rapid_TableMetaModel> appMetaData) {
		this.appMetaData = appMetaData;
	}
	
	public ArrayList<Rapid_TableValueModel> getAppInitValue() {
		return appInitValue;
	}
	
	public void setAppInitValue(ArrayList<Rapid_TableValueModel> appInitValue) {
		this.appInitValue = appInitValue;
	}

	public ArrayList<Properties> getAppTableRelation() {
		return appTableRelation;
	}

	public void setAppTableRelation(ArrayList<Properties> appTableRelation) {
		this.appTableRelation = appTableRelation;
	}
}
