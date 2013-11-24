package org.mycholan.rapidjs.meta.handlers;

import org.mycholan.rapidjs.meta.dao.Rapid_MetaDataAccessObject;
import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_MetaActionHandler {
	private RapidContext rContext = null;
	
	public Rapid_MetaActionHandler(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String doMetaAction() {
		Rapid_MetaDataAccessObject metaHandler = new Rapid_MetaDataAccessObject(rContext);	
		return metaHandler.doGetMetaData();
	}
}
