package com.jeecg.service.baizhi.clf;
import com.jeecg.entity.baizhi.clf.SurlEntity;
import org.jeecgframework.core.common.service.CommonService;

import java.io.Serializable;

public interface SurlServiceI extends CommonService{
	
 	public void delete(SurlEntity entity) throws Exception;
 	
 	public Serializable save(SurlEntity entity) throws Exception;
 	
 	public void saveOrUpdate(SurlEntity entity) throws Exception;
 	
}
