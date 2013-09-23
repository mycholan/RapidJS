package org.mycholan.rapidjs.model;

import java.util.ArrayList;
import java.util.Properties;

/**
 * 
 * @author Saravana Kumar K
 * @usage  Complete core meta container, which has everything for a particular application entity.
 *         Mainly used by factory module, which in turn responsible for 
 *         creating a new application or editing an existing one
 *
 */
public class Rapid_FactoryAppModel {
	private Properties application;	
	private ArrayList<Properties> containers;
	private ArrayList<Properties> layouts;
	private ArrayList<Properties> toolbar;
	private ArrayList<Properties> view;
	private ArrayList<Properties> controls;
			
	public Rapid_FactoryAppModel() {
		super();
	}
	
	public Properties getApplication() {
		return application;
	}
	public void setApplication(Properties application) {
		this.application = application;
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
	public ArrayList<Properties> getToolbar() {
		return toolbar;
	}
	public void setToolbar(ArrayList<Properties> toolbar) {
		this.toolbar = toolbar;
	}
	public ArrayList<Properties> getView() {
		return view;
	}
	public void setView(ArrayList<Properties> view) {
		this.view = view;
	}
	public ArrayList<Properties> getControls() {
		return controls;
	}
	public void setControls(ArrayList<Properties> controls) {
		this.controls = controls;
	}	
}
