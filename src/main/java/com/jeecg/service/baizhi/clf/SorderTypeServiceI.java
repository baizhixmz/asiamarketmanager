package com.jeecg.service.baizhi.clf;
import com.jeecg.entity.baizhi.clf.SorderTypeEntity;
import org.jeecgframework.core.common.service.CommonService;

import java.io.Serializable;

public interface SorderTypeServiceI extends CommonService{
	
 	public void delete(SorderTypeEntity entity) throws Exception;
 	
 	public Serializable save(SorderTypeEntity entity) throws Exception;
 	
 	public void saveOrUpdate(SorderTypeEntity entity) throws Exception;
 	
}
