package org.mycholan.rapidjs.model;

public class Rapid_ForeignKey {
	private String source_key;
	private String destination_key;
	private String destination_table;
	public String getSource_key() {
		return source_key;
	}
	public void setSource_key(String source_key) {
		this.source_key = source_key;
	}
	public String getDestination_key() {
		return destination_key;
	}
	public void setDestination_key(String destination_key) {
		this.destination_key = destination_key;
	}
	public String getDestination_table() {
		return destination_table;
	}
	public void setDestination_table(String destination_table) {
		this.destination_table = destination_table;
	}	
}
