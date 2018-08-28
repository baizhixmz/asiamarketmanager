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
 * @Description: 用户信息
 * @author onlineGenerator
 * @date 2018-08-27 17:37:47
 * @version V1.0   
 *
 */
@Entity
@Table(name = "s_user", schema = "")
@SuppressWarnings("serial")
public class SuserEntity implements java.io.Serializable {
	/**主键*/
	private java.lang.String id;
	/**cookieID*/
	private java.lang.String cookieid;
	/**手机号*/
	private java.lang.String phone;
	/**收货地址*/
	private java.lang.String address;
	/**收货人*/
	private java.lang.String name;
	/**取货时间*/
	private java.lang.String qtime;
	
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
	 *@return: java.lang.String  cookieID
	 */

	@Column(name ="COOKIEID",nullable=false,length=255)
	public java.lang.String getCookieid(){
		return this.cookieid;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  cookieID
	 */
	public void setCookieid(java.lang.String cookieid){
		this.cookieid = cookieid;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  手机号
	 */

	@Column(name ="PHONE",nullable=true,length=255)
	public java.lang.String getPhone(){
		return this.phone;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  手机号
	 */
	public void setPhone(java.lang.String phone){
		this.phone = phone;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  收货地址
	 */

	@Column(name ="ADDRESS",nullable=true,length=1000)
	public java.lang.String getAddress(){
		return this.address;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  收货地址
	 */
	public void setAddress(java.lang.String address){
		this.address = address;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  收货人
	 */

	@Column(name ="NAME",nullable=true,length=50)
	public java.lang.String getName(){
		return this.name;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  收货人
	 */
	public void setName(java.lang.String name){
		this.name = name;
	}
	/**
	 *方法: 取得java.lang.String
	 *@return: java.lang.String  取货时间
	 */

	@Column(name ="QTIME",nullable=true,length=100)
	public java.lang.String getQtime(){
		return this.qtime;
	}

	/**
	 *方法: 设置java.lang.String
	 *@param: java.lang.String  取货时间
	 */
	public void setQtime(java.lang.String qtime){
		this.qtime = qtime;
	}
}