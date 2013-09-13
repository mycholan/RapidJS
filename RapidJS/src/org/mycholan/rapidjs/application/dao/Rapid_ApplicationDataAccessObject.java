package org.mycholan.rapidjs.application.dao;

import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_ApplicationDataAccessObject {
	RapidContext rContext = null;
	String responseStr = "";
	
	public Rapid_ApplicationDataAccessObject(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String GetApplicationData() {
		return responseStr;
	}
	
	public String putApplicationData() {
		return responseStr;
	}
	
	public String deleteApplicationData() {
		return responseStr;
	}
	
	public String updateApplicationData() {
		return responseStr;
	}
	
	public String checkApplicationData() {
		return responseStr;
	}
}
