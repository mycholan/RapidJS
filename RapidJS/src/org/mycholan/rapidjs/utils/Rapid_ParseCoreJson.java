package org.mycholan.rapidjs.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Iterator;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.model.Rapid_FactoryMetaData;
import org.mycholan.rapidjs.model.Rapid_ForeignKey;
import org.mycholan.rapidjs.model.Rapid_RowValueModel;
import org.mycholan.rapidjs.model.Rapid_TableMetaModel;
import org.mycholan.rapidjs.model.Rapid_TableRelation;
import org.mycholan.rapidjs.model.Rapid_TableValueModel;
import org.mycholan.rapidjs.model.Rapid_UniqueKey;

/**
 * 
 * @author Saravana Kumar K
 * @purpose Parse and load the data from Core JSON files to object for later  reference.
 * 
 */
public class Rapid_ParseCoreJson {
	static Logger log = Logger.getLogger(Rapid_ParseCoreJson.class);
	private String PATH = "";
	private String CONTENT = "";

	private Rapid_ApplicationMetaData ApplicationMetaObj = null;
	private Rapid_FactoryMetaData FactoryMetaObj = null;

	private JSONObject JMasterObject = null;

	private JSONArray JTable = null;
	private JSONArray JColumn = null;
	private JSONArray JType = null;
	private JSONObject JRelation = null;
	private JSONArray JRelationIterator = null;
	private JSONObject JTableObj = null;

	private JSONArray JInitValue = null;
	private JSONObject JRowValue = null;
	private JSONArray JRowValueIterator = null;
	private JSONObject JValueObj = null;

	private ArrayList<Rapid_TableMetaModel> TableMetaObjList = null;
	private ArrayList<Rapid_TableValueModel> TableValueObjList = null;

	private ArrayList<String> FactoryMainTab = null;
	private ArrayList<String> FactorySubTab = null;

	private ArrayList<String> ALColumn = null;
	private ArrayList<String> ALType = null;
	private ArrayList<String> ALValue = null;

	private ArrayList<Rapid_ForeignKey> ALForeign = null;
	private ArrayList<Rapid_UniqueKey> ALUnique = null;

	private Rapid_TableRelation TableRelation = null;
	private Rapid_ForeignKey ForeignKey = null;
	private Rapid_UniqueKey UniqueKey = null;

	public Rapid_ApplicationMetaData ParseApplicationMetaData(String filename) {
		PATH = System.getProperty("user.dir") + "/bin/" + filename;
		log.info("Reading meta json file from : " + PATH);

		ApplicationMetaObj = new Rapid_ApplicationMetaData();
		TableMetaObjList = new ArrayList<Rapid_TableMetaModel>();
		TableValueObjList = new ArrayList<Rapid_TableValueModel>();

		ReadFile(PATH);

		if (ReadingTableAndValue()) {
			ApplicationMetaObj.setAppMetaData(TableMetaObjList);
			ApplicationMetaObj.setAppInitValue(TableValueObjList);
			return ApplicationMetaObj;
		}
		return null;
	}

	public Rapid_FactoryMetaData ParseFactoryMetaData(String filename) {
		PATH = System.getProperty("user.dir") + "/bin/" + filename;
		log.info("Reading meta json file from : " + PATH);

		FactoryMetaObj = new Rapid_FactoryMetaData();
		TableMetaObjList = new ArrayList<Rapid_TableMetaModel>();
		TableValueObjList = new ArrayList<Rapid_TableValueModel>();

		FactoryMainTab = new ArrayList<String>();
		FactorySubTab = new ArrayList<String>();

		ReadFile(PATH);

		if (ReadingTableAndValue()) {
			try {
				JSONArray JFactoryArray = JMasterObject.getJSONArray("factory_maintab_meta");
				for (int i = 0; i < JFactoryArray.length(); i++) {
					FactoryMainTab.add(JFactoryArray.getString(i));
				}

				JFactoryArray = JMasterObject.getJSONArray("factory_subtab_meta");
				for (int i = 0; i < JFactoryArray.length(); i++) {
					FactorySubTab.add(JFactoryArray.getString(i));
				}
			} catch (JSONException e) {
				e.printStackTrace();
				return null;
			}

			FactoryMetaObj.setFactoryMetaData(TableMetaObjList);
			FactoryMetaObj.setFactoryInitValue(TableValueObjList);
			FactoryMetaObj.setFactoryTab(FactoryMainTab);
			FactoryMetaObj.setFactorySubTab(FactorySubTab);

			return FactoryMetaObj;
		}
		return null;
	}

	private boolean ReadingTableAndValue() {
		Rapid_TableMetaModel tableObj = null;
		Rapid_TableValueModel valueObj = null;
		ArrayList<Rapid_RowValueModel> rowList = null;

		try {
			JMasterObject = new JSONObject(CONTENT);

			JTable = JMasterObject.getJSONArray("table");
			for (int i = 0; i < JTable.length(); i++) {
				JTableObj = JTable.getJSONObject(i);
				tableObj = new Rapid_TableMetaModel();

				tableObj.setTablename(JTableObj.getString("name"));
				JType = JTableObj.getJSONArray("type");
				JColumn = JTableObj.getJSONArray("column");

				ALType = new ArrayList<String>();
				ALColumn = new ArrayList<String>();

				for (int j = 0; j < JType.length(); j++) {
					ALType.add(JType.getString(j));
				}
				tableObj.setType(ALType);

				for (int j = 0; j < JColumn.length(); j++) {
					ALColumn.add(JColumn.getString(j));
				}
				tableObj.setColumn(ALColumn);

				JRelation = JTableObj.getJSONObject("relation");
				@SuppressWarnings("unchecked")
				Iterator<String> it = JRelation.keys();

				TableRelation = new Rapid_TableRelation();
				ALForeign = new ArrayList<Rapid_ForeignKey>();
				ALUnique = new ArrayList<Rapid_UniqueKey>();

				while (it.hasNext()) {
					JRelationIterator = JRelation.getJSONArray(it.next());
					if (JRelationIterator.getString(0).trim().equals("PRIMARY")) {
						TableRelation.setPrimary(JRelationIterator.getString(1).trim());
					} else if (JRelationIterator.getString(0).trim().equals("FOREIGN")) {
						ForeignKey = new Rapid_ForeignKey();
						ForeignKey.setSource_key(JRelationIterator.getString(1).trim());
						ForeignKey.setDestination_key(JRelationIterator.getString(2).trim());
						ForeignKey.setDestination_table(JRelationIterator.getString(3).trim());
						ALForeign.add(ForeignKey);
					} else if (JRelationIterator.getString(0).trim().equals("UNIQUE")) {
						UniqueKey = new Rapid_UniqueKey();
						UniqueKey.setFirst_key(JRelationIterator.getString(1).trim());
						UniqueKey.setSecond_key(JRelationIterator.getString(2).trim());
						ALUnique.add(UniqueKey);
					}
				}

				TableRelation.setForeign(ALForeign);
				TableRelation.setUnique(ALUnique);
				tableObj.setRelation(TableRelation);

				TableMetaObjList.add(tableObj);
			}

			JInitValue = JMasterObject.getJSONArray("init_value");
			for (int i = 0; i < JInitValue.length(); i++) {
				valueObj = new Rapid_TableValueModel();
				rowList = new ArrayList<Rapid_RowValueModel>();

				JValueObj = JInitValue.getJSONObject(i);
				valueObj.setTableName(JValueObj.getString("table"));

				JRowValue = JValueObj.getJSONObject("value");
				@SuppressWarnings("unchecked")
				Iterator<String> it = JRowValue.keys();

				while (it.hasNext()) {
					JRowValueIterator = JRowValue.getJSONArray(it.next());
					ALValue = new ArrayList<String>();
					for (int j = 0; j < JRowValueIterator.length(); j++) {
						ALValue.add(JRowValueIterator.getString(j));
					}
					rowList.add(new Rapid_RowValueModel(ALValue));
				}
				valueObj.setTableValue(rowList);
				TableValueObjList.add(valueObj);
			}

		} catch (JSONException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	private boolean ReadFile(String path) {
		FileInputStream stream = null;
		try {
			stream = new FileInputStream(new File(path));
			FileChannel fc = stream.getChannel();
			MappedByteBuffer bb = fc.map(FileChannel.MapMode.READ_ONLY, 0, fc.size());
			CONTENT = Charset.defaultCharset().decode(bb).toString();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return false;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				stream.close();
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
}