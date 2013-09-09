package org.mycholan.rapidjs.utils;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.mycholan.rapidjs.model.Rapid_ParamModel;

/**
 * 
 * @author Saravana Kumar K
 * @purpose mapping the json parameter coming from the browser to Rapid_ParamModel
 * 
 */
public class Rapid_ParseParameter {
     String PARAM = null;
     JSONObject jObj = null;
     JSONArray jDownload = null;
     JSONArray jDownloadKey = null;
     JSONArray jUpload = null;
     JSONArray jUploadKey = null;

     public Rapid_ParseParameter(String parameter) {
          PARAM = parameter;
     }

     public Rapid_ParamModel GetParameter() {
          Rapid_ParamModel RPM = new Rapid_ParamModel();
          try {
               jObj = new JSONObject(PARAM);

               jDownloadKey = jObj.getJSONArray("DOWNLOAD_KEY");
               jDownload = jObj.getJSONArray("DOWNLOAD_VALUE");
               jUploadKey = jObj.getJSONArray("UPLOAD_KEY");
               jUpload = jObj.getJSONArray("UPLOAD_VALUE");

               RPM.setRjType(jObj.getString("TARGET_TYPE"));
               RPM.setAction(jObj.getString("ACTION"));
               RPM.setTable(jObj.getString("TABLE"));
               RPM.setUser(jObj.getString("USER"));
               RPM.setWhereKey(jObj.getString("WHERE_KEY"));
               RPM.setWhereValue(jObj.getString("WHERE_VALUE"));
               RPM.setStartIndex(jObj.getInt("START_INDEX"));
               RPM.setEndIndex(jObj.getInt("END_INDEX"));
               RPM.setDownloadKey(jArrayToStringArray(jDownloadKey));
               RPM.setDownloadValue(jArrayToStringArray(jDownloadKey));
               RPM.setUploadKey(jArrayToStringArray(jUploadKey));
               RPM.setUploadValue(jArrayToStringArray(jUpload));

          } catch (JSONException e) {
               e.printStackTrace();
               return null;
          }

          return RPM;
     }

     private String[] jArrayToStringArray(JSONArray jArray) throws JSONException {
          String[] array = new String[jArray.length()];
          for (int i = 0; i < jArray.length(); i++) {
               array[i] = jArray.getString(i);
          }
          return array;
     }
}
