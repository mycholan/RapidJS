package org.mycholan.rapidjs.meta.dao;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.mycholan.rapidjs.factory.db.Rapid_DerbyManager;
import org.mycholan.rapidjs.model.Rapid_ApplicationMetaData;
import org.mycholan.rapidjs.model.Rapid_FactoryMetaData;
import org.mycholan.rapidjs.model.Rapid_TableModel;
import org.mycholan.rapidjs.utils.Rapid_DataAccessUtils;
import org.mycholan.rapidjs.utils.Rapid_ParseCoreJson;

/**
 * @author Saravana Kumar K
 * @purpose Initialize base schema with necessary data. called every time the server started.
 */
public class Rapid_InitSchema {
     static Logger log = Logger.getLogger(Rapid_InitSchema.class);
     
     public static Rapid_ApplicationMetaData InitApplicationSchema() {    	
    	 Rapid_ParseCoreJson ParseCoreJson = new Rapid_ParseCoreJson();
    	 Rapid_ApplicationMetaData AppMetaData = ParseCoreJson.ParseApplicationMetaData("app.json");
    	 
    	 if(AppMetaData != null) {
    		 if(SchemaInitializer(ListTable(AppMetaData), AppMetaData)) {
    			 return AppMetaData;
    		 }
    	 }
    	 
    	return null; 
     }
     
     public static Rapid_FactoryMetaData InitFactorySchema() {   
       Rapid_ParseCoreJson ParseCoreJson = new Rapid_ParseCoreJson();
    	 Rapid_FactoryMetaData FactoryMetaData = ParseCoreJson.ParseFactoryMetaData("factory.json");
    	 
    	 if(FactoryMetaData != null) {
    		 log.info("Parsing factory.json file completed");
    		 Rapid_ApplicationMetaData TempAppMetaObj = new Rapid_ApplicationMetaData();
    		 TempAppMetaObj.setAppMetaData(FactoryMetaData.getFactoryMetaData());
    		 TempAppMetaObj.setAppInitValue(FactoryMetaData.getFactoryInitValue());
    		 
    		 if(SchemaInitializer(ListTable(TempAppMetaObj), TempAppMetaObj)) {
    			 log.info("Initializing schema for Factory Success.!");
    			 return FactoryMetaData;
    		 }else {
    			 log.info("Initializing schema for Factory failed.!");
    		 }
    	 }else {
    		 log.info("Parsing factory.json file Failed.!");
    	 }
    	 
    	 return null;
     }
     
     private static boolean SchemaInitializer(String[] TableList, Rapid_ApplicationMetaData TableAndValue) {
    	 /* Used as error flag while doing data base operation */
         boolean flaQ = true;
         Rapid_DataAccessUtils DataAccessUtils = new Rapid_DataAccessUtils();
         
         boolean AllTableThere = true;
         Rapid_DerbyManager rjdb = new Rapid_DerbyManager();         
         
         ArrayList<Rapid_TableModel> TableObjList = new ArrayList<Rapid_TableModel>();
         Rapid_TableModel TableObj = null;
         
         for(int i = 0; i < TableAndValue.getAppMetaData().size(); i++) {
        	 for(int j = 0; j < TableAndValue.getAppInitValue().size(); j++) {
        		 if(TableAndValue.getAppMetaData().get(i).getTablename().trim().equals(TableAndValue.getAppInitValue().get(j).getTableName())) {
        			 TableObj = new Rapid_TableModel();
        			 TableObj.setTablename(TableAndValue.getAppMetaData().get(i).getTablename().trim());
        			 TableObj.setColumn(TableAndValue.getAppMetaData().get(i).getColumn());
        			 TableObj.setType(TableAndValue.getAppMetaData().get(i).getType());
        			 TableObj.setValues(TableAndValue.getAppInitValue().get(j).getTableValue());
        			 TableObjList.add(TableObj);
        		 }
        	 }
         }
        
         rjdb.GetConnection();
         for (int i = 0; i < TableList.length; i++) {
              if (rjdb.CheckIfTableExist(TableList[i])) {
                   AllTableThere = false;
                   if (!rjdb.CreateTable(DataAccessUtils.CreateTableSqlStatement(TableList[i], TableAndValue))) {
                        log.info(TableList[i] + " Table created failed");
                        flaQ = false;
                   }
              }
         }
         rjdb.CloseConnection();
         
         /* if all table already there, then no need to go further, just return the meta data */
         if (AllTableThere) {
              log.info("InitializeSchema() Schema already there, and we left with Meta Data.");
              return true;
         }

         /*
          * if flaQ is false then probably some error occurred while creating tables, better to
          * return null
          */
         if (flaQ) {
              for (int i = 0; i < TableObjList.size(); i++) {
                   flaQ = rjdb.InsertFactory(TableObjList.get(i));
              }
         } else {
        	 log.info("InitializeSchema(), Error while Creating Tables.!");
              return false;
         }

         if (flaQ) {
              log.info("InitializeSchema() completed its operation Sccessfully.");
              return true;
         } else {
        	 log.info("InitializeSchema(), Error while Initializing Tables.!");
              return false;
         }        
     }
     
     private static String[] ListTable(Rapid_ApplicationMetaData appMeta) {
	     ArrayList<String> tableList = new ArrayList<String>();	     
	     
	     for(int i = 0; i < appMeta.getAppMetaData().size(); i++) {
		     tableList.add(appMeta.getAppMetaData().get(i).getTablename());
	     }
	     
	     return  tableList.toArray(new String[tableList.size()]);
     }
}