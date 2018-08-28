package com.jeecg.controller.baizhi.clf;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.util.DynamicDBUtil;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.web.system.pojo.base.TSUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/tSTaskController")
public class TSTaskController {
	
	private TSUser user = ResourceUtil.getSessionUser();
	
	/**
	 * 首页取得任务的消息
	 * 
	 * @param user
	 * @param req
	 * @return
	 */
	@RequestMapping(params = "getTaskMessageCount")
	@ResponseBody
	public AjaxJson getNoticeList(HttpServletRequest req) {
		Integer cont = 0;
		AjaxJson j = new AjaxJson();
		j.setObj(0);
		String userRoleId = user.getId();
		
		if(userRoleId.equals("402881e75f1f2471015f206d63e60015")){
			 String qsql = "select  id,order_num,order_status,order_salary,shop_id,user_id,time,admin_id from s_order where order_status = '待处理' and admin_id = '"+user.getId()+"'";
			  List<Map<String, Object>> taskList = DynamicDBUtil.findList("net_shop", qsql);
			  if (null != taskList && !taskList.isEmpty()) {
					cont += taskList.size();
			  } 
		 }
		System.out.println("未处理："+cont);
		j.setObj(cont);
		return j;
	}
}
