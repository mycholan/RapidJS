package org.mycholan.rapidjs.model;

import java.util.ArrayList;
import java.util.Properties;

/**
 * 
 * @author saravana
 * @purpose Model class for factory.json file, Represents entire factory.json file as a an object. 
 *
 */
public class Rapid_FactoryMetaData {
	private ArrayList<String> factoryTab;
	private ArrayList<String> factorySubTab;
	
	private ArrayList<Rapid_TableMetaModel> factoryMetaData;
	private ArrayList<Rapid_TableValueModel> factoryInitValue;	
	private ArrayList<Properties> factoryTableRelation;
	
	public Rapid_FactoryMetaData(ArrayList<String> tab,
			ArrayList<String> subTab,
			ArrayList<Rapid_TableMetaModel> metaData,
			ArrayList<Rapid_TableValueModel> initValue,
			ArrayList<Properties> tableRelation) {
		super();
		factoryTab = tab;
		factorySubTab = subTab;
		factoryMetaData = metaData;
		factoryInitValue = initValue;
		factoryTableRelation = tableRelation;
	}

	public Rapid_FactoryMetaData() {}

	public ArrayList<String> getFactoryTab() {
		return factoryTab;
	}
	
	public void setFactoryTab(ArrayList<String> factoryTab) {
		this.factoryTab = factoryTab;
	}
	
	public ArrayList<String> getFactorySubTab() {
		return factorySubTab;
	}
	
	public void setFactorySubTab(ArrayList<String> factorySubTab) {
		this.factorySubTab = factorySubTab;
	}
	
	public ArrayList<Rapid_TableMetaModel> getFactoryMetaData() {
		return factoryMetaData;
	}
	
	public void setFactoryMetaData(ArrayList<Rapid_TableMetaModel> factoryMetaData) {
		this.factoryMetaData = factoryMetaData;
	}
	
	public ArrayList<Rapid_TableValueModel> getFactoryInitValue() {
		return factoryInitValue;
	}
	
	public void setFactoryInitValue(
			ArrayList<Rapid_TableValueModel> factoryInitValue) {
		this.factoryInitValue = factoryInitValue;
	}

	public ArrayList<Properties> getFactoryTableRelation() {
		return factoryTableRelation;
	}

	public void setFactoryTableRelation(ArrayList<Properties> factoryTableRelation) {
		this.factoryTableRelation = factoryTableRelation;
	}	
}
