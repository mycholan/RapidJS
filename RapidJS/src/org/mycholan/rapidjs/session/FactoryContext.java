package org.mycholan.rapidjs.session;

import java.util.ArrayList;
import java.util.Properties;

public class FactoryContext {
	private Properties application;
	private ArrayList<Properties> windows;
	private ArrayList<Properties> containers;
	private ArrayList<Properties> layouts;
	private ArrayList<Properties> toolbars;
	private ArrayList<Properties> views;
	private ArrayList<Properties> controls;
	
	public FactoryContext() {
		super();
	}

	public Properties getApplication() {
		return application;
	}

	public void setApplication(Properties application) {
		this.application = application;
	}

	public ArrayList<Properties> getWindows() {
		return windows;
	}

	public void setWindows(ArrayList<Properties> windows) {
		this.windows = windows;
	}

	public ArrayList<Properties> getContainers() {
		return containers;
	}

	public void setContainers(ArrayList<Properties> containers) {
		this.containers = containers;
	}

	public ArrayList<Properties> getLayouts() {
		return layouts;
	}

	public void setLayouts(ArrayList<Properties> layouts) {
		this.layouts = layouts;
	}

	public ArrayList<Properties> getToolbars() {
		return toolbars;
	}

	public void setToolbars(ArrayList<Properties> toolbars) {
		this.toolbars = toolbars;
	}

	public ArrayList<Properties> getViews() {
		return views;
	}

	public void setViews(ArrayList<Properties> views) {
		this.views = views;
	}

	public ArrayList<Properties> getControls() {
		return controls;
	}

	public void setControls(ArrayList<Properties> controls) {
		this.controls = controls;
	}	
}
