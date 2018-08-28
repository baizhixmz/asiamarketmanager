package com.jeecg.entity.baizhi.clf;

import java.math.BigDecimal;
import java.util.Date;
import java.lang.String;
import java.lang.Double;
import java.lang.Integer;
import java.math.BigDecimal;
import javax.xml.soap.Text;
import java.sql.Blob;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.SequenceGenerator;
import org.jeecgframework.poi.excel.annotation.Excel;

/**   
 * @Title: Entity
 * @Description: 店铺地址
 * @author onlineGenerator
 * @date 2018-08-21 08:59:20
 * @version V1.0   
 *
 */
@Entity
@Table(name = "s_url", schema = "")
@SuppressWarnings("serial")
public class SurlEntity implements java.io.Serializable {
	/**主键*/
	private java.lang.String id;
	/**店铺地址*/
	@Excel(name="店铺地址",width=15)
	private java.lang.String url;
	/**店铺状态*/
	@Excel(name="店铺状态",width=15)
	private java.lang.String status;
	/**店长外键*/
	@Excel(name="店长外键",width=15,dictTable ="t_s_base_user",dicCode ="id",dicText ="username")
	private java.lang.String adminId;
	/**中文店名*/
	@Excel(name="中文店名",width=15)
	private java.lang.String name1;
	/**德文店名*/
	@Excel(name="德文店名",width=15)
	private java.lang.String name2;
	/**最低包邮价格*/
	@Excel(name="最低包邮价格",width=15)
	private java.lang.Double minPrice;
	
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  主键
	 */
	@Id
	@GeneratedValue(generator = "paymentableGenerator")
	@GenericGenerator(name = "paymentableGenerator", strategy = "uuid")

	@Column(name ="ID",nullable=false,length=36)
	public java.lang.String getId(){
		return this.id;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  主键
	 */
	public void setId(java.lang.String id){
		this.id = id;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  店铺地址
	 */

	@Column(name ="URL",nullable=false,length=255)
	public java.lang.String getUrl(){
		return this.url;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  店铺地址
	 */
	public void setUrl(java.lang.String url){
		this.url = url;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  店铺状态
	 */

	@Column(name ="STATUS",nullable=false,length=20)
	public java.lang.String getStatus(){
		return this.status;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  店铺状态
	 */
	public void setStatus(java.lang.String status){
		this.status = status;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  店长外键
	 */

	@Column(name ="ADMIN_ID",nullable=false,length=255)
	public java.lang.String getAdminId(){
		return this.adminId;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  店长外键
	 */
	public void setAdminId(java.lang.String adminId){
		this.adminId = adminId;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  中文店名
	 */

	@Column(name ="NAME1",nullable=false,length=255)
	public java.lang.String getName1(){
		return this.name1;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  中文店名
	 */
	public void setName1(java.lang.String name1){
		this.name1 = name1;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  德文店名
	 */

	@Column(name ="NAME2",nullable=false,length=255)
	public java.lang.String getName2(){
		return this.name2;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  德文店名
	 */
	public void setName2(java.lang.String name2){
		this.name2 = name2;
	}
	/**
	 *方法: 取得java.lang.Double
	 *@return: java.lang.Double  最低包邮价格
	 */

	@Column(name ="MIN_PRICE",nullable=false)
	public java.lang.Double getMinPrice(){
		return this.minPrice;
	}

	/**
	 *方法: 设置java.lang.Double
	 *@param: java.lang.Double  最低包邮价格
	 */
	public void setMinPrice(java.lang.Double minPrice){
		this.minPrice = minPrice;
	}
}
