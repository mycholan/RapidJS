package org.mycholan.rapidjs.session;

import java.util.ArrayList;
import java.util.Properties;

/**
 * 
 * @author saravana
 * @usage holds the application and window objects, that being used currently. 
 *
 */
public class AppContext {
	private Properties Application;
	private Properties Window;
	private ArrayList<Properties> Action;
	private Properties user;
	
	public AppContext() {
		super();
	}

	public Properties getApplication() {
		return Application;
	}

	public void setApplication(Properties application) {
		Application = application;
	}

	public Properties getWindow() {
		return Window;
	}

	public void setWindow(Properties window) {
		Window = window;
	}

	public ArrayList<Properties> getAction() {
		return Action;
	}

	public void setAction(ArrayList<Properties> action) {
		Action = action;
	}

	public Properties getUser() {
		return user;
	}

	public void setUser(Properties user) {
		this.user = user;
	}	
}
