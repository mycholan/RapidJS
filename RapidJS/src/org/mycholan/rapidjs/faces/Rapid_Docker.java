package org.mycholan.rapidjs.faces;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.mycholan.rapidjs.delegates.Rapid_Router;
import org.mycholan.rapidjs.factory.guards.Rapid_StarterApp;
import org.mycholan.rapidjs.session.AppContext;
import org.mycholan.rapidjs.session.RapidContext;
import org.mycholan.rapidjs.utils.Rapid_ParseParameter;

/**
 * 
 * @author Saravana Kumar K
 * @purpose Primary Interface, all the communication between browser and server will happens through
 *          this servlet
 * 
 */
@WebServlet("/Rapid_Docker")
public class Rapid_Docker extends HttpServlet {
     private static final long serialVersionUID = 1L;
     static Logger log = Logger.getLogger(Rapid_Docker.class);

     public Rapid_Docker() {
          super();
     }

     protected void doGet(HttpServletRequest request, HttpServletResponse response)
               throws ServletException, IOException {
          doPost(request, response);
     }

     protected void doPost(HttpServletRequest request, HttpServletResponse response)
               throws ServletException, IOException {
          PrintWriter writerR = response.getWriter();
          HttpSession sess = request.getSession();
          Rapid_ParseParameter rpp = null;
          Rapid_Router RR = null;
          RapidContext RC = new RapidContext(sess, null);
          AppContext AC = (AppContext) sess.getAttribute("RJS_AppContext");

          /*
           * If RC == null, this is the first request arrived after web server started or
           * session timeout occurred. In both case we need to redirect to login page
           */
          if (AC == null) {      	  
               Rapid_StarterApp startApp = new Rapid_StarterApp(RC);
               writerR.println(startApp.StartAdmin());
               return;
          }

          String requestStr = request.getParameter("DATA");

          if (requestStr != null && requestStr.equals("") && requestStr.equals(" ")) {
               writerR.println("{\"status\":\"Parameter Missing\", \"info\":\"expected parameter DATA\"}");
               return;
          }

          rpp = new Rapid_ParseParameter(requestStr);
          RC.setRequestModel(rpp.GetParameter());
          RR = new Rapid_Router(RC);         
          writerR.println(RR.ActionRouter());
     }
}
