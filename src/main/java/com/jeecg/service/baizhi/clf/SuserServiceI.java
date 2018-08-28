package com.jeecg.service.baizhi.clf;
import com.jeecg.entity.baizhi.clf.SuserEntity;
import org.jeecgframework.core.common.service.CommonService;

import java.io.Serializable;

public interface SuserServiceI extends CommonService{
	
 	public void delete(SuserEntity entity) throws Exception;
 	
 	public Serializable save(SuserEntity entity) throws Exception;
 	
 	public void saveOrUpdate(SuserEntity entity) throws Exception;
 	
}
