package org.mycholan.rapidjs.factory.dao;

import java.util.ArrayList;
import java.util.Properties;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.mycholan.rapidjs.RapidJS.Rapid_MasterHandler;
import org.mycholan.rapidjs.loader.Rapid_Initializer;
import org.mycholan.rapidjs.session.RapidContext;
import org.mycholan.rapidjs.session.RapidCoreMeta;

public class Rapid_FactoryDataAccessObject {
	RapidCoreMeta coreMeta = null;
	RapidContext rContext = null;
	String responseStr = "";
	
	JSONArray jArray = null;
	JSONObject jObj = null;
	
	public Rapid_FactoryDataAccessObject(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String getFactoryData() {
		Rapid_MasterHandler masterHandler = new Rapid_MasterHandler(rContext);
		if(rContext.getRequestModel().getTable().equals("APP_LIST")) {
			ArrayList<Properties> appList = masterHandler.GetApplicationList();
			jArray = JSONArray.fromObject(appList);
			responseStr = jArray.toString();
		} else if(rContext.getRequestModel().getTable().equals("APP_DATA")) {
			coreMeta = Rapid_Initializer.Init_RJ_Context();
			
		} else {
			
		}
		return responseStr;
	}
	
	public String newFactoryData() {
		return responseStr;
	}
	
	public String putFactoryData() {
		return responseStr;
	}
	
	public String deleteFactoryData() {
		return responseStr;
	}
	
	public String updateFactoryData() {
		return responseStr;
	}
	
	public String checkFactoryData() {
		return responseStr;
	}
}
