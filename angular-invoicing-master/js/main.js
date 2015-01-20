var mainModule = angular.module('mainModule', ['InvoiceControllers'/*, 'InvoiceServices'*/]);

var directives = {};
directives.jqAnimate = function() {
  return function(scope, instanceElement){ 
      setTimeout(function() {instanceElement.show('slow');}, 0); 
  } 
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#company_logo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// window.onbeforeunload = function(e) {
//   confirm('Are you sure you would like to close this tab? All your data will be lost');
// };

mainModule.directive(directives);

$(document).ready(function(){
  $("#invoice_number").focus();
  $("#imgInp").change(function(){
    readURL(this);
  });
});