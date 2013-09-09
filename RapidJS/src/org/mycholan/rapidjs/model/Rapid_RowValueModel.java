package org.mycholan.rapidjs.model;

import java.util.ArrayList;

/**
 * 
 * @author saravana
 * @purpose Used to holds "value" section values from core json files. Contains multi rows of data for each table
 *
 */

public class Rapid_RowValueModel {
	private ArrayList<String> tvalue;

	public Rapid_RowValueModel(ArrayList<String> tvalue) {
		super();
		this.tvalue = tvalue;
	}

	public ArrayList<String> getTvalue() {
		return tvalue;
	}

	public void setTvalue(ArrayList<String> tvalue) {
		this.tvalue = tvalue;
	}
}
