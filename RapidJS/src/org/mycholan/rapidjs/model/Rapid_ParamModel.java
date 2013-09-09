package org.mycholan.rapidjs.model;

public class Rapid_ParamModel {
	private String RjType;
	private String Action;
	private String Table;
	private String User;
	private String WhereKey;
	private String WhereValue;     
	private String[] UploadKey;
	private String[] UploadValue;
	private String[] DownloadKey;
	private String[] DownloadValue;
	private int StartIndex;
	private int EndIndex;

	public Rapid_ParamModel(String rjType, String action, String table, String user, String whereKey, String whereValue, String[] uploadKey, String[] uploadValue,
			String[] downloadKey, String[] downloadValue, int startIndex, int endIndex) {
		super();
		RjType = rjType;
		Action = action;
		Table = table;
		User = user;
		WhereKey = whereKey;
		WhereValue = whereValue;
		UploadKey = uploadKey;
		UploadValue = uploadValue;
		DownloadKey = downloadKey;
		DownloadValue = downloadValue;
		StartIndex = startIndex;
		EndIndex = endIndex;
	}

	public Rapid_ParamModel() {
		super();
	}	
	
	public String getRjType() {
		return RjType;
	}

	public void setRjType(String rjType) {
		RjType = rjType;
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

	public String getWhereKey() {
		return WhereKey;
	}

	public void setWhereKey(String whereKey) {
		WhereKey = whereKey;
	}

	public String getWhereValue() {
		return WhereValue;
	}

	public void setWhereValue(String whereValue) {
		WhereValue = whereValue;
	}

	public String[] getUploadKey() {
		return UploadKey;
	}

	public void setUploadKey(String[] uploadKey) {
		UploadKey = uploadKey;
	}

	public String[] getUploadValue() {
		return UploadValue;
	}

	public void setUploadValue(String[] uploadValue) {
		UploadValue = uploadValue;
	}

	public String[] getDownloadKey() {
		return DownloadKey;
	}

	public void setDownloadKey(String[] downloadKey) {
		DownloadKey = downloadKey;
	}

	public String[] getDownloadValue() {
		return DownloadValue;
	}

	public void setDownloadValue(String[] downloadValue) {
		DownloadValue = downloadValue;
	}

	public int getStartIndex() {
		return StartIndex;
	}

	public void setStartIndex(int startIndex) {
		StartIndex = startIndex;
	}

	public int getEndIndex() {
		return EndIndex;
	}

	public void setEndIndex(int endIndex) {
		EndIndex = endIndex;
	}     
}
