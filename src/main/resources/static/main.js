
function tr(text) {
    return '<tr>' + text + '</tr>';
}

function row(key, value) {
    return $(
        tr(
        	'<td>' + value._id + '</td>'+
        	'<td>' + value.address + '</td>' +
        	'<td>' + value.contractStDate + '</td>' +
        	'<td>' + value.contractEndDate + '</td>' +
        	'<td>' + value.status + '</td>'));
}

/**
 * Clear and reload the values in data table.
 */
function refreshTable() {
	
    $.get('/equipmentDetails/equipment/search/', function(data) {
        var attr,
            mainTable = $('#mainTable tbody');
        mainTable.empty();
        for (attr in data) {
            if (data.hasOwnProperty(attr)) {
                mainTable.append(row(attr, data[attr]));
            }
        }
    });
}


function limitTable(limitVal) {
	
	
	$.ajax({
	      url: "/equipmentDetails/equipment/search/?limit="+limitVal,
	      method: "GET",
          dataType: 'json',
	      success: function(result,status,jqXHR ){
	    	
	    	  //alert(data);
	    	  var attr,
		            mainTable = $('#mainTable tbody');
		        mainTable.empty();
		        for (attr in result) {
		            if (result.hasOwnProperty(attr)) {
		                mainTable.append(row(attr, result[attr]));
		            }
		        }
	       },
	       error(jqXHR, textStatus, errorThrown){
	          alert(JSON.stringify(jqXHR));
	          refreshTable();
	       }
	  }); 
	
}


function findEquipment(equipmet) {
	
	
	$.ajax({
	      url: "/equipmentDetails/equipment/"+equipmet,
	      method: "GET",
          dataType: 'json',
	      success: function(result,status,jqXHR ){
	    	  
	    	  //alert(data);
	    	  var attr,
		            mainTable = $('#mainTable tbody');
		        mainTable.empty();
		        
		        //for (attr in result) {
		            //if (result.hasOwnProperty(attr)) {
		            //	alert("attr");
		                mainTable.append(row(attr,  result));
		            //}
		       // }
	       },
	       error(jqXHR, textStatus, errorThrown){
	          alert(JSON.stringify(jqXHR));
	          refreshTable();
	       }
	  }); 
	
}




$(document).ready(function() {
	var _id = $('#_id'),
	address = $('#address'),contractStDate=$("#contractStDate"),contractEndDate = $("#contractEndDate"),status = $("#status")
	,limit = $("#limit"),equipmentID = $("#equipmentID");
	
	
    refreshTable();
    
    $('#limitButton').click(function(event) {
    	
    	limitTable(limit.val());
    	
    });
    
    $('#equipmentButton').click(function(event) {
    	
    	findEquipment(equipmentID.val());
    	
    });
    
    
    $('#addForm').on('submit', function(event) {
    	
        var data = {
        		 _id : _id.val(),
 	            address:address.val(),
 	            contractStDate: contractStDate.val(),
 	            contractEndDate: contractEndDate.val(),
 	            status: status.val()
 	           
        };

        
        var dataval = JSON.stringify(data);
        /*
        $.post('/equipmentDetails/equipment',  function(dataval) {
        	alert(dataval);
            refreshTable();
          
        });*/
        
        
        $.ajax({
  	      url: "/equipmentDetails/equipment",
  	      method: "POST",
  	      data:  JSON.stringify(data),
  	      contentType : 'application/json; charset=utf-8',
          dataType: 'json',
  	      success: function(result,status,jqXHR ){
  	    	
  	    	   refreshTable();
  	       },
  	       error(jqXHR, textStatus, errorThrown){
  	          alert(JSON.stringify(jqXHR));
  	          refreshTable();
  	       }
  	  }); 
       
      
        event.preventDefault();
    });

    $("#refreshButton").click(function(){
    	  refreshTable();
    });
   /* $("#addButton").click(function(){
    	alert("button click");
    	  var data = {
    	            "id": $("#_id").val(),
    	            "address": $("#address").val(),
    	            "contractStDate": $("#contractStDate").val(),
    	            "contractEndDate": $("#contractEndDate").val(),
    	            "status": $("#status").val()
    	        };
    	   
    	  alert(JSON.stringify(data));
    	  
    	  $.ajax({
    	      url: "/equipmentDetails/equipment",
    	      method: "POST",
    	      data: data,
    	      dataType: 'json',
    	      contentType: "application/json",
    	      success: function(result,status,jqXHR ){
    	    	   refreshTable();
    	       },
    	       error(jqXHR, textStatus, errorThrown){
    	          alert(JSON.stringify(jqXHR));
    	       }
    	  }); 
    	  
    	});

  */
    
   
   
});
