package org.mycholan.rapidjs.session;

import javax.servlet.http.HttpSession;

import org.mycholan.rapidjs.model.Rapid_ParamModel;

public class RapidContext {
	private HttpSession session = null;
	private Rapid_ParamModel requestModel = null;
	
	public RapidContext(HttpSession session, Rapid_ParamModel requestModel) {
		super();
		this.session = session;
		this.requestModel = requestModel;
	}

	public HttpSession getSession() {
		return session;
	}

	public void setSession(HttpSession session) {
		this.session = session;
	}

	public Rapid_ParamModel getRequestModel() {
		return requestModel;
	}

	public void setRequestModel(Rapid_ParamModel requestModel) {
		this.requestModel = requestModel;
	}
}
