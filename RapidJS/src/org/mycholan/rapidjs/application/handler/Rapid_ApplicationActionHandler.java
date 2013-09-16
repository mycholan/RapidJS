package org.mycholan.rapidjs.application.handler;

import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_ApplicationActionHandler {
	RapidContext rContext = null;
	String responseStr = "";
	
	
	public Rapid_ApplicationActionHandler(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String doAction() {
		if (rContext.getRequestModel().getAction().equals("NEW")) {

		} else if (rContext.getRequestModel().getAction().equals("SAVE")) {

		} else if (rContext.getRequestModel().getAction().equals("DELETE")) {

		} else if (rContext.getRequestModel().getAction().equals("GET")) {

		} else if (rContext.getRequestModel().getAction().equals("CHECK")) {

		}
		return responseStr;
	}	
}
