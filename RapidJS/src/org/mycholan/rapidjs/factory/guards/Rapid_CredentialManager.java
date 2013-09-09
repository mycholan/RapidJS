package org.mycholan.rapidjs.factory.guards;

import org.mycholan.rapidjs.session.RapidContext;

public class Rapid_CredentialManager {
	private RapidContext rContext = null;
	private String UserName = null;
	private String Password = null;
	
	public Rapid_CredentialManager(RapidContext rcontext) {
		rContext = rcontext;
	}
	
	public String doLogin() {
		return "";
	}
	
	public String doLogout() {
		return "";
	}
}
