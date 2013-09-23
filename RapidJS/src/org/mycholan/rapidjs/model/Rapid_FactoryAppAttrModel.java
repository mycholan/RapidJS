package org.mycholan.rapidjs.model;

import java.util.ArrayList;
import java.util.Properties;

/**
 * 
 * @author Saravana Kumar K
 * @usage  contains list of actions, styles, data and devices of particular 
 * 		   entity can be application, container, layout, tool bar, view or control.
 *
 */

public class Rapid_FactoryAppAttrModel {
	private ArrayList<Properties> actions;
	private ArrayList<Properties> styles;
	private ArrayList<Properties> data;
	private ArrayList<Properties> device;	
	
	public Rapid_FactoryAppAttrModel() {
		super();
	}
	
	public ArrayList<Properties> getActions() {
		return actions;
	}
	public void setActions(ArrayList<Properties> actions) {
		this.actions = actions;
	}
	public ArrayList<Properties> getStyles() {
		return styles;
	}
	public void setStyles(ArrayList<Properties> styles) {
		this.styles = styles;
	}
	public ArrayList<Properties> getData() {
		return data;
	}
	public void setData(ArrayList<Properties> data) {
		this.data = data;
	}
	public ArrayList<Properties> getDevice() {
		return device;
	}
	public void setDevice(ArrayList<Properties> device) {
		this.device = device;
	}	
}
