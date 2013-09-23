package org.mycholan.rapidjs.meta.dao;

import net.sf.json.JSONArray;

import org.mycholan.rapidjs.loader.Rapid_Initializer;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.model.Rapid_FactoryMetaData;
import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_MetaDataAccessObject {
	private RapidContext rContext = null;
	Rapid_FactoryMetaData FactoryMetaObj = null;
	Rapid_ApplicationMetaData AppMetaData = null;
	JSONArray jArray = null;
	
	public Rapid_MetaDataAccessObject(RapidContext rcontext) {
		rContext = rcontext;
		FactoryMetaObj = Rapid_Initializer.LoadFactoryMeta();
		AppMetaData = Rapid_Initializer.LoadApplicationMeta();
	}
	
	public String doGetMetaData() {
		if(rContext.getRequestModel().getTable().equals("BASE")) {			
			/*return all the table which will be to create tabs in factory page*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactoryTab());
		}else if(rContext.getRequestModel().getTable().equals("SUBTAB")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else if(rContext.getRequestModel().getTable().equals("ELEMENT")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else if(rContext.getRequestModel().getTable().equals("ACTION")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else if(rContext.getRequestModel().getTable().equals("STYLE")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else if(rContext.getRequestModel().getTable().equals("DATA")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else if(rContext.getRequestModel().getTable().equals("DEVICE")) {
			/*return meta tab which will be used to create sub tabs*/
			jArray = JSONArray.fromObject(FactoryMetaObj.getFactorySubTab());
		}else{
			/*return column list of particular table */
			for(int i = 0; i < AppMetaData.getAppMetaData().size(); i++) {
				if(AppMetaData.getAppMetaData().get(i).getTablename().equals(rContext.getRequestModel().getTable())) {
					jArray = JSONArray.fromObject(AppMetaData.getAppMetaData().get(i).getColumn());
				}
			}
		}
		
		if(jArray != null) {
			return jArray.toString();
		}
		
		return "{\"status\":\"Table not found\", \"info\":\"\"}";
	}
}
