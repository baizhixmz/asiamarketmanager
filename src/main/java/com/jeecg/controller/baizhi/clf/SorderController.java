package com.jeecg.controller.baizhi.clf;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jeecg.demo.entity.JeecgDemoEntity;
import com.jeecg.entity.baizhi.clf.SorderItemEntity;
import com.jeecg.entity.baizhi.clf.SorderTypeEntity;
import com.jeecg.entity.baizhi.clf.SproductEntity;
import com.jeecg.entity.baizhi.clf.SuserEntity;
import com.jeecg.service.baizhi.clf.SorderItemServiceI;
import com.jeecg.service.baizhi.clf.SorderTypeServiceI;
import com.jeecg.service.baizhi.clf.SproductServiceI;
import com.jeecg.service.baizhi.clf.SuserServiceI;
import com.jeecg.vo.ExcelOrder;
import com.jeecg.vo.ExcelOrderItem;
import com.jeecg.vo.ProductItem;

import net.sf.cglib.core.CollectionUtils;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Workbook;
import org.jeecgframework.core.util.ResourceUtil;
import org.jeecgframework.poi.excel.ExcelExportUtil;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.vo.NormalExcelConstants;
import org.jeecgframework.web.system.pojo.base.TSUser;
import org.jeecgframework.web.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.jeecgframework.core.common.controller.BaseController;
import org.jeecgframework.core.common.hibernate.qbc.CriteriaQuery;
import org.jeecgframework.core.common.model.json.AjaxJson;
import org.jeecgframework.core.common.model.json.DataGrid;
import org.jeecgframework.core.constant.Globals;
import org.jeecgframework.core.util.StringUtil;
import org.jeecgframework.tag.core.easyui.TagUtil;
import org.jeecgframework.web.system.pojo.base.TSDepart;
import org.jeecgframework.web.system.service.SystemService;
import org.jeecgframework.core.util.MyBeanUtils;

import com.jeecg.entity.baizhi.clf.SorderEntity;
import com.jeecg.service.baizhi.clf.SorderServiceI;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.jeecgframework.core.beanvalidator.BeanValidators;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author zhangdaihao
 * @version V1.0
 * @Title: Controller
 * @Description: 订单表
 * @date 2018-03-14 14:59:51
 */
@Controller
@RequestMapping("/sorderController")
public class SorderController extends BaseController {
    /**
     * Logger for this class
     */
    private static final Logger logger = Logger.getLogger(SorderController.class);

    @Autowired
    private SorderServiceI sorderService;
    @Autowired
    private SystemService systemService;
    @Autowired
    private Validator validator;
    @Autowired
    private SorderItemServiceI sorderItemService;
    @Autowired
    private SuserServiceI suserServiceI;
    @Autowired
    private SproductServiceI sproductServiceI;
    @Autowired
    private UserService userService;
    @Autowired
    private SorderTypeServiceI sorderTypeServiceI;


    /**
     * 订单表列表 页面跳转
     *
     * @return
     */
    @RequestMapping(params = "list")
    public ModelAndView list(HttpServletRequest request) {
        return new ModelAndView("com/jeecg/baizhi.clf/sorderList");
    }
    
    @RequestMapping(params = "webapplist")
    public ModelAndView webapplist(HttpServletRequest request) {
    	System.out.println("=====================");
    	return new ModelAndView("com/jeecg/baizhi.clf/sorderListWebapp");
    }

    /**
     * easyui AJAX请求数据
     *
     * @param request
     * @param response
     * @param dataGrid
     * @param user
     */

    @RequestMapping(params = "datagrid")
    public void datagrid(SorderEntity sorder, HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
        CriteriaQuery cq = new CriteriaQuery(SorderEntity.class, dataGrid);

        TSUser tsUser = ResourceUtil.getSessionUser();

        cq.eq("adminId", tsUser.getId());

        //查询条件组装器
        org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, sorder, request.getParameterMap());
        this.sorderService.getDataGridReturn(cq, true);
        //获得当前店铺的所有订单
        List<SorderEntity> results = (List<SorderEntity>) dataGrid.getResults();

        //List<SorderEntity> results = sorderService.findByProperty(SorderEntity.class, "adminId", tsUser.getId());


        List<SorderEntity> results2 = new ArrayList<SorderEntity>();
        //扩展字段集合
        HashMap<String, Map<String, Object>> extMap = new HashMap<String, Map<String,Object>>();
        for (SorderEntity od : results) {
            
            List<SorderTypeEntity> orderType = sorderTypeServiceI.findByProperty(SorderTypeEntity.class, "orderNum", od.getOrderNum());
            
            //获取收货或取货信息
            SorderTypeEntity sorderTypeEntity = orderType.get(0);
            //获取该订单的所有订单项
            List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", od.getId());
            
       
            //每行所扩展的字段
            HashMap<String, Object> map = new HashMap<String, Object>();

            map.put("userMsg", sorderTypeEntity.getName());
            map.put("phone", sorderTypeEntity.getPhone());
            map.put("orderAddress",sorderTypeEntity.getAddress());
            map.put("qTime",sorderTypeEntity.getQtime());

            //添加扩展字段
            extMap.put(od.getId(), map);
            //每行数据
            results2.add(od);

        }
        //把更改的数据覆盖原有的数据
        dataGrid.setResults(results2);
        

        TagUtil.datagrid(response, dataGrid, extMap);
    }
    
    @RequestMapping(params = "datagridWebapp")
    @ResponseBody
    public void datagridWebapp(SorderEntity sorder, HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
    	CriteriaQuery cq = new CriteriaQuery(SorderEntity.class, dataGrid);
    	
    	TSUser tsUser = ResourceUtil.getSessionUser();
    	
    	cq.eq("adminId", tsUser.getId());
    	
    	//查询条件组装器
    	org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, sorder, request.getParameterMap());
    	this.sorderService.getDataGridReturn(cq, true);
    	//获得当前店铺的所有订单
    	//List<SorderEntity> results = (List<SorderEntity>) dataGrid.getResults();
    	
    	List<SorderEntity> orders = systemService.findByProperty(SorderEntity.class, "adminId", tsUser.getId());
    	
    	List<SorderEntity> results2 = new ArrayList<SorderEntity>();
    	//扩展字段集合
    	HashMap<String, Map<String, Object>> extMap = new HashMap<String, Map<String,Object>>();
    	for (SorderEntity od : orders) {
    		if("待处理".equals(od.getOrderStatus())){
	    		List<SorderTypeEntity> orderType = sorderTypeServiceI.findByProperty(SorderTypeEntity.class, "orderNum", od.getOrderNum());
	    		
	    		//获取收货或取货信息
	    		SorderTypeEntity sorderTypeEntity = orderType.get(0);
	    		//获取该订单的所有订单项
	    		List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", od.getId());
	    		
	    		
	    		//每行所扩展的字段
	    		HashMap<String, Object> map = new HashMap<String, Object>();
	    		
	    		map.put("userMsg", sorderTypeEntity.getName());
	    		map.put("phone", sorderTypeEntity.getPhone());
	    		map.put("orderAddress",sorderTypeEntity.getAddress());
	    		map.put("qTime",sorderTypeEntity.getQtime());
	    		
	    		//添加扩展字段
	    		extMap.put(od.getId(), map);
	    		//每行数据
	    		results2.add(od);
    		}
    	}
    	
    	//把更改的数据覆盖原有的数据
    	dataGrid.setResults(results2);
    	
    	DataGrid dataGrid2 = new DataGrid();
         
        System.out.println(results2.size());
         
        dataGrid2.setResults(results2);
    	
    	TagUtil.datagrid(response, dataGrid, extMap);
    }

   

    /**
     * 删除订单表
     *
     * @return
     */
    @RequestMapping(params = "del")
    @ResponseBody
    public AjaxJson del(SorderEntity sorder, HttpServletRequest request) {
        String message = null;
        AjaxJson j = new AjaxJson();
        sorder = systemService.getEntity(SorderEntity.class, sorder.getId());
        message = "订单表删除成功";
        sorder.setAdminId("null");
        sorderService.saveOrUpdate(sorder);
        //sorderService.delete(sorder);
        systemService.addLog(message, Globals.Log_Type_DEL, Globals.Log_Leavel_INFO);

        j.setMsg(message);
        return j;
    }


    /**
     * 添加订单表
     *
     * @param ids
     * @return
     */
    @RequestMapping(params = "save")
    @ResponseBody
    public AjaxJson save(SorderEntity sorder, HttpServletRequest request) {
        String message = null;
        AjaxJson j = new AjaxJson();
        if (StringUtil.isNotEmpty(sorder.getId())) {
            message = "订单表更新成功";
            SorderEntity t = sorderService.get(SorderEntity.class, sorder.getId());
            try {
                MyBeanUtils.copyBeanNotNull2Bean(sorder, t);
                sorderService.saveOrUpdate(t);
                systemService.addLog(message, Globals.Log_Type_UPDATE, Globals.Log_Leavel_INFO);
            } catch (Exception e) {
                e.printStackTrace();
                message = "订单表更新失败";
            }
        } else {
            message = "订单表添加成功";
            sorderService.save(sorder);
            systemService.addLog(message, Globals.Log_Type_INSERT, Globals.Log_Leavel_INFO);
        }
        j.setMsg(message);
        return j;
    }

    /**
     * 订单表列表页面跳转
     *
     * @return
     */
    @RequestMapping(params = "addorupdate")
    public ModelAndView addorupdate(SorderEntity sorder, HttpServletRequest req) {
        if (StringUtil.isNotEmpty(sorder.getId())) {
            sorder = sorderService.getEntity(SorderEntity.class, sorder.getId());
            req.setAttribute("sorderPage", sorder);
        }
        return new ModelAndView("com/jeecg/baizhi.clf/sorder");
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<SorderEntity> list() {
        List<SorderEntity> listSorders = sorderService.getList(SorderEntity.class);
        return listSorders;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable("id") String id) {
        SorderEntity task = sorderService.get(SorderEntity.class, id);
        if (task == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(task, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> create(@RequestBody SorderEntity sorder, UriComponentsBuilder uriBuilder) {
        //调用JSR303 Bean Validator进行校验，如果出错返回含400错误码及json格式的错误信息.
        Set<ConstraintViolation<SorderEntity>> failures = validator.validate(sorder);
        if (!failures.isEmpty()) {
            return new ResponseEntity(BeanValidators.extractPropertyAndMessage(failures), HttpStatus.BAD_REQUEST);
        }

        //保存
        sorderService.save(sorder);

        //按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
        String id = sorder.getId();
        URI uri = uriBuilder.path("/rest/sorderController/" + id).build().toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uri);

        return new ResponseEntity(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@RequestBody SorderEntity sorder) {
        //调用JSR303 Bean Validator进行校验，如果出错返回含400错误码及json格式的错误信息.
        Set<ConstraintViolation<SorderEntity>> failures = validator.validate(sorder);
        if (!failures.isEmpty()) {
            return new ResponseEntity(BeanValidators.extractPropertyAndMessage(failures), HttpStatus.BAD_REQUEST);
        }

        //保存
        sorderService.saveOrUpdate(sorder);

        //按Restful约定，返回204状态码, 无内容. 也可以返回200状态码.
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id) {
        sorderService.deleteEntityById(SorderEntity.class, id);
    }

    @RequestMapping(params = "openOrderItem")
    public String openProductDetail(String id, HttpServletRequest request) {
        request.setAttribute("id", id);

        return "com/jeecg/baizhi.clf/sorderItems";
    }

    @RequestMapping(params = "findOrderItem")
    public void findOrderItem(SorderEntity sorderEntity, HttpServletRequest request, HttpServletResponse response, DataGrid dataGrid) {
        //通过订单获取订单项数据
        List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", sorderEntity.getOrderNum());

        /*//封装商品数据
        ArrayList<SproductEntity> products = new ArrayList<>();


        HashMap<String, Map<String, Object>> extMap = new HashMap<>();
        //通过订单项获取该订单的所有商品
        for (SorderItemEntity orderItem : orderItems) {
            SproductEntity product = sproductServiceI.getEntity(SproductEntity.class, orderItem.getProductId());
            //覆盖商品的价格为该订单项的价格
            product.setPrice(orderItem.getPrice());
            products.add(product);
            HashMap<String, Object> map = new HashMap<>();
            //添加扩展字段购买的数量
            map.put("count", orderItem.getCount());
            extMap.put(product.getId(), map);
        }
*/
        //覆盖原有的数据
        dataGrid.setResults(orderItems);

        TagUtil.datagrid(response, dataGrid);
    }
    @RequestMapping(params = "changeStatus")
    @ResponseBody
    public void changeStatus(SorderEntity sorder, HttpServletRequest request) {
        String status = sorder.getOrderStatus();
        if (status.equals("已处理")) {

            sorder.setOrderStatus("待处理");

        } else {
            sorder.setOrderStatus("已处理");
        }
        sorderService.saveOrUpdate(sorder);
    }
    
    @RequestMapping(params = "cancelOrder")
    @ResponseBody
    public void cancelOrder(SorderEntity sorder, HttpServletRequest request) {
        String status = sorder.getOrderStatus();
        

        sorder.setOrderStatus("已取消");

        
        sorderService.saveOrUpdate(sorder);
    }
    
    @RequestMapping(params = "cancelOrderById")
    @ResponseBody
    public String cancelOrderById(String id, HttpServletRequest request) {
    	
    	SorderEntity sorder = sorderService.findUniqueByProperty(SorderEntity.class, "id", id);
    	
    	
    	sorder.setOrderStatus("已取消");
    	
    	
    	sorderService.saveOrUpdate(sorder);
    	
    	return "success";
    }
    
    

    @RequestMapping(params = "exportXls")
    //导出订单数据
    public String exportXls(SorderEntity sorder, HttpServletRequest request, HttpServletResponse response
            , DataGrid dataGrid, ModelMap modelMap) {

        CriteriaQuery cq = new CriteriaQuery(SorderEntity.class, dataGrid);

        TSUser tsUser = ResourceUtil.getSessionUser();
        cq.eq("adminId", tsUser.getId());
        //查询条件组装器
        org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, sorder, request.getParameterMap());
        this.sorderService.getDataGridReturn(cq, true);
        //获得当前店铺符合条件订单
        List<SorderEntity> results = (List<SorderEntity>) dataGrid.getResults();

        //封装要导出的数据
        ArrayList<ExcelOrderItem> data = new ArrayList<ExcelOrderItem>();

        //一个订单对应多个商品
        for (SorderEntity od : results) {
            //替换导出的信息
            ExcelOrderItem excelOrderItem = new ExcelOrderItem();

            excelOrderItem.setOrderNum(od.getOrderNum());
            excelOrderItem.setOrderSalary(od.getOrderSalary());
            excelOrderItem.setCreateTime(od.getTime());
            //通过excel注解自动查询
            excelOrderItem.setPhone(od.getUserId());
            excelOrderItem.setUsername(od.getUserId());

            //疯传订单详情
            ArrayList<ProductItem> productItems = new ArrayList<ProductItem>();

            //获取该订单的所有订单项
            List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", od.getOrderNum());

            for (SorderItemEntity orderItem : orderItems) {
                //封装详情数据
                ProductItem productItem = new ProductItem();

                productItem.setCount(orderItem.getCount());
                productItem.setProductName(orderItem.getName());
                productItem.setProductNum(orderItem.getProductNum());
                productItems.add(productItem);
            }
            excelOrderItem.setProductItemList(productItems);
            data.add(excelOrderItem);
        }

        String time_begin = request.getParameter("time_begin");
        String time_end = request.getParameter("time_end");
        if(time_begin == null) time_begin = "all";
        if(time_end == null) time_end = "";
        time_begin = time_begin.replace("-", "");
        time_end = time_end.replace("-","");
        modelMap.put(NormalExcelConstants.FILE_NAME,"订单详情/L'Ordine di dettagli/"+time_begin+"_"+time_end);
        modelMap.put(NormalExcelConstants.CLASS,ExcelOrderItem.class);
        modelMap.put(NormalExcelConstants.PARAMS,new ExportParams("订单详情/L'Ordine di dettagli", "导出人:"+ResourceUtil.getSessionUser().getRealName(),"导出信息"));
        modelMap.put(NormalExcelConstants.DATA_LIST,data);
        return NormalExcelConstants.JEECG_EXCEL_VIEW;
    }
    @RequestMapping(params = "exportXls2")
    //导出采购信息
    public String exportXls2(SorderEntity sorder, HttpServletRequest request, HttpServletResponse response
            , DataGrid dataGrid, ModelMap modelMap) {

        CriteriaQuery cq = new CriteriaQuery(SorderEntity.class, dataGrid);

        TSUser tsUser = ResourceUtil.getSessionUser();

        cq.eq("adminId", tsUser.getId());
        //查询条件组装器
        org.jeecgframework.core.extend.hqlsearch.HqlGenerateUtil.installHql(cq, sorder, request.getParameterMap());
        this.sorderService.getDataGridReturn(cq, true);
        //获得当前店铺符合条件订单
        List<SorderEntity> results = (List<SorderEntity>) dataGrid.getResults();

        //组装采购数据
        Map<String, ExcelOrder> stringExcelOrderMap = new HashMap<String, ExcelOrder>();

        //一个订单对应多个商品
        for (SorderEntity od : results) {
            //获取该订单的所有订单项
            List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", od.getOrderNum());

            //通过订单项获取该订单的所有商品
            for (SorderItemEntity orderItem : orderItems) {
               // SproductEntity product = sproductServiceI.getEntity(SproductEntity.class, orderItem.getProductId());

                if(stringExcelOrderMap.containsKey(orderItem.getProductId())){
                    ExcelOrder excelOrder1 = stringExcelOrderMap.get(orderItem.getProductId());
                    //进行数量叠加
                    excelOrder1.setCount(excelOrder1.getCount()+orderItem.getCount());
                    continue;
                }
                ExcelOrder excelOrder = new ExcelOrder();

                excelOrder.setCount(orderItem.getCount());
                excelOrder.setProductName(orderItem.getName());
                excelOrder.setPrice(orderItem.getPrice());
                excelOrder.setUsername(od.getUserId());
                excelOrder.setPhone(od.getUserId());
                /*if(orderItem.getFlag()!=null && product.getFlag().equals("Y")){
                    excelOrder.setFlag("是/Yes");

                }else{
                    excelOrder.setFlag("否/No");
                }*/
                stringExcelOrderMap.put(orderItem.getProductId(),excelOrder);
            }
        }

        String time_begin = request.getParameter("time_begin");
        String time_end = request.getParameter("time_end");
        if(time_begin == null) time_begin = "all";
        if(time_end == null) time_end = "";
        time_begin = time_begin.replace("-", "");
        time_end = time_end.replace("-","");
        Collection<ExcelOrder> values = stringExcelOrderMap.values();
        modelMap.put(NormalExcelConstants.FILE_NAME,"采购信息/L'acquisto di dati/"+time_begin+"_"+time_end);
        modelMap.put(NormalExcelConstants.CLASS,ExcelOrder.class);
        modelMap.put(NormalExcelConstants.PARAMS,new ExportParams("采购数据/L'acquisto di dati", "导出人:"+ResourceUtil.getSessionUser().getRealName(),"导出信息"));
        modelMap.put(NormalExcelConstants.DATA_LIST,values);
        return NormalExcelConstants.JEECG_EXCEL_VIEW;
    }
    
    @ResponseBody
    @RequestMapping(params = "updateOrder")
    public String getAdminOrder(HttpServletRequest request,String id){
    	
    	TSUser tsUser = ResourceUtil.getSessionUser();
    	
    	
    	SorderEntity sorderEntity = sorderService.findUniqueByProperty(SorderEntity.class, "id", id);
    	
    	sorderEntity.setOrderStatus("已处理");
    	
    	sorderService.saveOrUpdate(sorderEntity);
    
    	return "success";
    	
    }
    
    @ResponseBody
    @RequestMapping(params = "getAdminOrders")
    public List<SorderEntity> getAdminOrders(HttpServletRequest request){
    	
    	TSUser tsUser = (TSUser)request.getSession().getAttribute(ResourceUtil.LOCAL_CLINET_USER);
    	
    	List<SorderEntity> orders = systemService.findByProperty(SorderEntity.class, "adminId", tsUser.getId());
    	
    	List<SorderEntity> result = new ArrayList<SorderEntity>();
    	
    	for (SorderEntity sorderEntity : orders) {
    		
    		
			if("待处理".equals(sorderEntity.getOrderStatus())){
				result.add(sorderEntity);
			}
		}
    	
    	return result;
    	
    }
    
    @ResponseBody
    @RequestMapping(params = "getOrderItems")
    public List<SorderItemEntity> getOrderItems(HttpServletRequest request,String orderNum){
    	
    	List<SorderItemEntity> orderItems = sorderItemService.findByProperty(SorderItemEntity.class, "orderId", orderNum);
    	
    	return orderItems;
    	
    }
    
    @ResponseBody
    @RequestMapping(params = "getOrderById")
    public SorderEntity getOrderById(HttpServletRequest request,String id){
    	
    	SorderEntity order = sorderService.findUniqueByProperty(SorderEntity.class, "id", id);
    	
    	return order;
    	
    }

}
