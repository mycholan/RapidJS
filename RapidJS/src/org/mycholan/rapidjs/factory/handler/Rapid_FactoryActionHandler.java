package org.mycholan.rapidjs.factory.handler;

import org.mycholan.rapidjs.factory.dao.Rapid_FactoryDataAccessObject;
import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_FactoryActionHandler {
	Rapid_FactoryDataAccessObject dao = null;
	RapidContext rContext = null;
	String responseStr = "";
	
	
	public Rapid_FactoryActionHandler(RapidContext rcontext) {
		rContext = rcontext;
		dao = new Rapid_FactoryDataAccessObject(rContext);
	}
	
	public String doAction() {		
		if (rContext.getRequestModel().getAction().equals("GET")) {
			responseStr = dao.getFactoryData();
		} else if (rContext.getRequestModel().getAction().equals("NEW")) {
			responseStr = dao.newFactoryData();
		} else if (rContext.getRequestModel().getAction().equals("SAVE")) {
			responseStr = dao.putFactoryData();
		} else if (rContext.getRequestModel().getAction().equals("DELETE")) {
			responseStr = dao.deleteFactoryData();
		} else if (rContext.getRequestModel().getAction().equals("UPDATE")) {
			responseStr = dao.updateFactoryData();
		} else if (rContext.getRequestModel().getAction().equals("CHECK")) {
			responseStr = dao.checkFactoryData();
		}
		return responseStr;
	}	
}
