package org.mycholan.rapidjs.model;

public class Rapid_ParamModel {
	private String Target;
	private String Action;
	private String Table;
	private String User;	
	private String[] Projection;
	private String[] Selector;     
	private String SelectorType;
	private String OrderBy;
	private String GroupBy;
	private String Having;
	private int Page;
	private int Count;
	private String Data;
	
	public Rapid_ParamModel() {
		super();
	}
	
	public String getTarget() {
		return Target;
	}
	public void setTarget(String target) {
		Target = target;
	}
	public String getAction() {
		return Action;
	}
	public void setAction(String action) {
		Action = action;
	}
	public String getTable() {
		return Table;
	}
	public void setTable(String table) {
		Table = table;
	}
	public String getUser() {
		return User;
	}
	public void setUser(String user) {
		User = user;
	}
	public String[] getProjection() {
		return Projection;
	}
	public void setProjection(String[] projection) {
		Projection = projection;
	}
	public String[] getSelector() {
		return Selector;
	}
	public void setSelector(String[] selector) {
		Selector = selector;
	}
	public String getSelectorType() {
		return SelectorType;
	}
	public void setSelectorType(String selectorType) {
		SelectorType = selectorType;
	}
	public String getOrderBy() {
		return OrderBy;
	}
	public void setOrderBy(String orderBy) {
		OrderBy = orderBy;
	}
	public String getGroupBy() {
		return GroupBy;
	}
	public void setGroupBy(String groupBy) {
		GroupBy = groupBy;
	}
	public String getHaving() {
		return Having;
	}
	public void setHaving(String having) {
		Having = having;
	}
	public int getPage() {
		return Page;
	}
	public void setPage(int page) {
		Page = page;
	}
	public int getCount() {
		return Count;
	}
	public void setCount(int count) {
		Count = count;
	}
	public String getData() {
		return Data;
	}
	public void setData(String data) {
		Data = data;
	}	
}
