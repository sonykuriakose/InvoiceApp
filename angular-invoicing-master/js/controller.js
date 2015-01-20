var InvoiceControllers = angular.module('InvoiceControllers',[]);

InvoiceControllers.controller('InvoiceController',['$scope',
  function(scope) {

  scope.logoRemoved = false;
  scope.printMode = false;

  var sample_invoice = {
            tax: 12.36, 
            invoice_number: 10,
            invoice_date: 05/02/2013,
            ro_number: 5263,
            topic: "Amity Launching",
            type:"Color",
            customer_info:  {name: "Mr. John Doe", web_link: "John Doe Designs Inc.", address1: "1 Infinite Loop", address2: "Cupertino, California, US", postal: "90210"},
            company_info:  {name: "Metaware Labs", web_link: "www.metawarelabs.com", address1: "123 Yonge Street", address2: "Toronto, ON, Canada", postal: "M5S 1B6"},
            items:[ {slno:1, qty:10, amount:9000, description:'Gadget', pages:4, material:'Thick foil', size:'9X6'}]};

  if(localStorage["invoice"] == "" || localStorage["invoice"] == null){
    scope.invoice = sample_invoice;
  }
  else{
    scope.invoice =  JSON.parse(localStorage["invoice"]);
  }
    scope.addItem = function() {
        scope.invoice.items.push({slno:0, qty:0, amount:0, description:"", pages:0, material:"", size:""});    
    }
    scope.removeLogo = function(element) {
        var elem = angular.element("#remove_logo");
        if(elem.text() == "Show Logo"){
          elem.text("Remove Logo");
          scope.logoRemoved = false;
        }
        else{
          elem.text("Show Logo");
          scope.logoRemoved = true;
        }

    }

    scope.editLogo = function(){
      $("#imgInp").trigger("click");
    }

    scope.showLogo = function() {
        scope.logoRemoved = false;
    }
    scope.removeItem = function(item) {
        scope.invoice.items.splice(scope.invoice.items.indexOf(item), 1);    
    }
    
    scope.invoice_sub_total = function() {
        var total = 0.00;
        angular.forEach(scope.invoice.items, function(item, key){
          total += item.amount * 1;
        });
        return total;
    }
    scope.calculate_tax = function() {
      return ((scope.invoice.tax * scope.invoice_sub_total())/100);
    }
    scope.calculate_grand_total = function() {
      localStorage["invoice"] = JSON.stringify(scope.invoice);
      return scope.calculate_tax() + scope.invoice_sub_total();
    }
    scope.totalinwords = function() {
      var tot = scope.calculate_grand_total();
      scope.words = "";
      scope.words = /*Exec.Convert.*/toWords(tot);
      return scope.words;
    } 

    scope.printInfo = function() {
      window.print();
    }

    scope.clearLocalStorage = function(){
      var confirmClear = confirm("Are you sure you would like to clear the invoice?");
      if(confirmClear){
        localStorage["invoice"] = "";
        scope.invoice = sample_invoice;
      }
    }


}]);