package com.jeecg.controller.baizhi.clf;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.hibernate.annotations.Where;
import org.jeecgframework.core.common.service.CommonService;
import org.jeecgframework.core.util.ApplicationContextUtil;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.web.system.pojo.base.TSUser;
import org.jeecgframework.web.system.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.jeecg.entity.baizhi.clf.SorderEntity;
import com.jeecg.entity.baizhi.clf.SorderItemEntity;
import com.jeecg.service.baizhi.clf.SorderItemServiceI;
import com.jeecg.service.baizhi.clf.SorderServiceI;

@ServerEndpoint("/websocket/{uId}/{dpId}")
public class Swebsocket {
	private static final Logger logger = Logger.getLogger(Swebsocket.class);
	private int currentIndex;
	private SystemService systemService; //调取的其他类
	private CommonService commonService; //调取的其他类
	private String uId;
	private String dpId;
	private Session session;
	
	@OnOpen
	public void onOpen(@PathParam("uId") String uId,@PathParam("dpId") String dpId,Session session) {
			this.session = session;
			this.uId = uId;
			this.dpId = dpId;
			//调取的其他类
			ApplicationContext ctx = ApplicationContextUtil.getContext();
		    if (ctx.containsBean("systemService")) {
		      this.systemService = ((SystemService)ctx.getBean("systemService"));
		    }
		    if (ctx.containsBean("commonService")) {
			  this.commonService = ((CommonService)ctx.getBean("commonService"));
			}
		    while (true) {
		    	currentIndex=0;
		    	//这之间写业务代码 查数据库......... 
		    	//System.out.println(uId);
		    	List<SorderEntity> orders = systemService.findByProperty(SorderEntity.class, "adminId", uId);
		    	for (SorderEntity sorderEntity : orders) {
		    		//System.out.println(sorderEntity.getOrderStatus());
		    		if("待处理".equals(sorderEntity.getOrderStatus())){
		    			currentIndex++;
		    		}
				}
		    	//session.getBasicRemote().sendText(String.valueOf(currentIndex));
				session.getAsyncRemote().sendText(String.valueOf(currentIndex));
	            try {
	               //一秒刷新一次
	            	Thread.sleep(1000*60);
	            } catch (InterruptedException e) {
	               e.printStackTrace();
	            }
		    }
		      
	}
	 
		
	@OnClose
	public void onClose(){
		logger.info("有一连接关闭！ "  );
	}
	@OnError
	public void onError(Session session, Throwable error){
		logger.info("发生错误");
		error.printStackTrace();
	}
	
}
