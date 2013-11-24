package org.mycholan.rapidjs.meta.handlers;

import org.mycholan.rapidjs.meta.dao.Rapid_MetaHandler;
import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_MetaAction {
	private RapidContext rContext = null;
	
	public Rapid_MetaAction(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String doMetaAction() {
		Rapid_MetaHandler metaHandler = new Rapid_MetaHandler(rContext);	
		System.out.println("ActionRouter, Rapid_MetaAction handler");
		return metaHandler.doGetMetaData();
	}
}
