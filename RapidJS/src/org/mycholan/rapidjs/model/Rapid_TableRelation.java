package org.mycholan.rapidjs.model;

import java.util.ArrayList;

public class Rapid_TableRelation {
	private String primary;
	private ArrayList<Rapid_ForeignKey> foreign;
	private ArrayList<Rapid_UniqueKey> unique;
	
	public Rapid_TableRelation() {
		super();
	}
	public String getPrimary() {
		return primary;
	}
	public void setPrimary(String primary) {
		this.primary = primary;
	}
	public ArrayList<Rapid_ForeignKey> getForeign() {
		return foreign;
	}
	public void setForeign(ArrayList<Rapid_ForeignKey> foreign) {
		this.foreign = foreign;
	}
	public ArrayList<Rapid_UniqueKey> getUnique() {
		return unique;
	}
	public void setUnique(ArrayList<Rapid_UniqueKey> unique) {
		this.unique = unique;
	}	
}
