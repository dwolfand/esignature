
var sigCapture = null;

$(document).ready(function(e) {
	$("#submit").click( onSubmitClick );
	$("#cancel").click( onCancelClick );
	$("#sign-button").click( changeToEnterSignature );
	$("#view-button").click( changeToViewSignature );
	$("#cancel-view").click( onCancelViewClick );
});

$(document).on("pagechange",function(e,data) {
	if (data.toPage[0].id === "enter-signature"){
		sigCapture = new SignatureCapture( "signature" );
	}
	
	if (data.toPage[0].id === "main"){
		if(sigCapture){
			sigCapture.clear();
		}
		$("#viewName").html("");
		$("#viewSignature").find('img').remove();
	}
});


function onSubmitClick( event ) {
		var name = $("#name").val();
		var sig = sigCapture.toString();
		
		var data = { "name":name,
					 "signature":sig};
		
		var url = "http://localhost:8180/esignatureone/rest/signatures";
		$.ajax({
 		  type: 'POST',
		  url: url,
		  contentType: 'application/json',
		  data:JSON.stringify(data),
		  success: requestSuccessSign,
		  error: requestError
		});
	
}

function onCancelClick( event ) {
	$("#feedback").html( "Cancelled" );
	$.mobile.changePage($('#main'));
}

function onCancelViewClick( event ) {
	$("#feedback").html( "" );
	$.mobile.changePage($('#main'));
}

function changeToEnterSignature( event ) {
	if ($("#name").val()){
		$.mobile.changePage($('#enter-signature'));
	}
	else{
		$("#feedback").html( "please enter you name" );
	}
}

function changeToViewSignature( event ) {
	var url = "http://localhost:8180/esignatureone/rest/signatures/search/findByName?name="+$("#name").val();
	$.ajax({
		  type: 'GET',
	  url: url,
	  success: requestSuccessView,
	  error: requestError
	});		
}

function requestSuccessView( data, textStatus, jqXHR ) {
	if (!$.isEmptyObject(data)){
		$.mobile.changePage($('#view-signature'));
		$("#viewName").html(data._embedded.signatures[0].name);
		$("#viewSignature").append($('<img/>').attr('src',data._embedded.signatures[0].signature));
	}
	else{
		$("#feedback").html( "No record found" );
	}
}

function requestSuccessSign( data, textStatus, jqXHR ) {
	$.mobile.changePage($('#main'));
	$("#feedback").html( "Submitted. Thank you." );
}

function requestError( jqXHR, textStatus, errorThrown ) {
	$.mobile.changePage($('#main'));
	$("#feedback").html( "Error: " + errorThrown );
}

