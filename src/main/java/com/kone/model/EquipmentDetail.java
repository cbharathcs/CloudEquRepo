package com.kone.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class EquipmentDetail {
	//private String id;
	private String _id;
	private String address;
	private String contractStDate;
	private String contractEndDate;
	private String status;

	
	
	

	/*public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}*/

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContractStDate() {
		return contractStDate;
	}

	public void setContractStDate(String contractStDate) {
		this.contractStDate = contractStDate;
	}

	public String getContractEndDate() {
		return contractEndDate;
	}

	public void setContractEndDate(String contractEndDate) {
		this.contractEndDate = contractEndDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
