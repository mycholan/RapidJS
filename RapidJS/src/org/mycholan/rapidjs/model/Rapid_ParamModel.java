package org.mycholan.rapidjs.model;

public class Rapid_ParamModel {
	private String Target;
	private String Action;
	private String Table;
	private String User;	
	private String[] Projection;
	private String[] SelectorKeys;  
	private String[] SelectorValues;  
	private String SelectorType;
	private String[] OrderByProjection;
	private String OrderByType;
	private String Operator;
	private String Range;
	private String[] Contains;
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

	public String[] getSelectorKeys() {
		return SelectorKeys;
	}

	public void setSelectorKeys(String[] selectorKeys) {
		SelectorKeys = selectorKeys;
	}

	public String[] getSelectorValues() {
		return SelectorValues;
	}

	public void setSelectorValues(String[] selectorValues) {
		SelectorValues = selectorValues;
	}

	public String getSelectorType() {
		return SelectorType;
	}

	public void setSelectorType(String selectorType) {
		SelectorType = selectorType;
	}

	public String[] getOrderByProjection() {
		return OrderByProjection;
	}

	public void setOrderByProjection(String[] orderByProjection) {
		OrderByProjection = orderByProjection;
	}

	public String getOrderByType() {
		return OrderByType;
	}

	public void setOrderByType(String orderByType) {
		OrderByType = orderByType;
	}

	public String getOperator() {
		return Operator;
	}

	public void setOperator(String operator) {
		Operator = operator;
	}

	public String getRange() {
		return Range;
	}

	public void setRange(String range) {
		Range = range;
	}

	public String[] getContains() {
		return Contains;
	}

	public void setContains(String[] contains) {
		Contains = contains;
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
