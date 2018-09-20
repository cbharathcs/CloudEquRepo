package com.kone.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloudant.client.api.Database;
import com.kone.exception.EquipmentException;
import com.kone.model.EquipmentDetail;

@Controller
@RequestMapping("/equipmentDetails")
public class EquipmentController {

	@Autowired
	private Database db;

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@RequestMapping(method = RequestMethod.GET, value = "/equipment/search")
	public @ResponseBody List<EquipmentDetail> getAllEquipments(@RequestParam(required = false) String limit)
			throws IOException {
		
		if (limit == null) {
			return db.getAllDocsRequestBuilder().includeDocs(true).build().getResponse()
					.getDocsAs(EquipmentDetail.class);
		} else {
			return db.getAllDocsRequestBuilder().limit(Integer.parseInt(limit)).includeDocs(true).build().getResponse()
					.getDocsAs(EquipmentDetail.class);
		}

	}

	@RequestMapping(method = RequestMethod.POST, value = "/equipment")
	public @ResponseBody String Save(@RequestBody EquipmentDetail equipmentDetails)
			throws IOException, EquipmentException {
	
		EquipmentDetail equipmentDetail = null;

		try {
			equipmentDetail = db.find(EquipmentDetail.class, equipmentDetails.get_id());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (equipmentDetail != null) {
			throw new EquipmentException("Equipment id is Duplicated");
		} else {
			db.save(equipmentDetails);
			return "Data saved successfully";
		}

	}

	@RequestMapping(method = RequestMethod.GET, value = "/equipment/{_id}")
	public @ResponseBody EquipmentDetail getEquipment(@PathVariable String _id) throws IOException, Exception {
	
		try {
			return db.find(EquipmentDetail.class, _id);
		} catch (Exception e) {
			throw new EquipmentException("Data not found");
		}
	}

}