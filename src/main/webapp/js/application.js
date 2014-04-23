// JavaScript Document
var sigCapture = null;

$(document).ready(function(e) {
	
	sigCapture = new SignatureCapture( "signature" );
	
	$("#submit").click( onSubmitClick );
	$("#cancel").click( onCancelClick );
});

function onSubmitClick( event ) {
	if ( verifyEmail() )
	{
		$("#feedback").html( "Sending..." );
		var email = $("#email").val();
		var sig = sigCapture.toString();
		
		var data = { "name":email,
					 "signature":sig};
		
		var url = "http://localhost:8080/esignatureone/rest/signatures";
		$.ajax({
 		  type: 'POST',
		  url: url,
		  contentType: 'application/json',
		  data:JSON.stringify(data),
		  success: requestSuccess,
		  error: requestError
		});
	}	
	else {	
		$("#feedback").html( "Please enter a valid email address." );
	}
	
}

function onCancelClick( event ) {
	clearForm();
}

function clearForm() {
	$("#email").val( "" );
	sigCapture.clear();
	$("#feedback").html( "" );
}

function requestSuccess( data, textStatus, jqXHR ) {
	clearForm();
	$("#feedback").html( "Thank you." );
}

function requestError( jqXHR, textStatus, errorThrown ) {
	$("#feedback").html( "Error: " + errorThrown );
}

function verifyEmail() {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( $("#email").val() );
}

