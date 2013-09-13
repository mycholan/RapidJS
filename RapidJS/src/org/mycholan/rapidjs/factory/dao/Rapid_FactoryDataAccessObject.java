package org.mycholan.rapidjs.factory.dao;

import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_FactoryDataAccessObject {
	RapidContext rContext = null;
	String responseStr = "";
	
	public Rapid_FactoryDataAccessObject(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String GetFactoryData() {
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
