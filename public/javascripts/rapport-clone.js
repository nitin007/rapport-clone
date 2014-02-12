var RapportClone = function(){
  this.init();
}

RapportClone.prototype = {
  init: function(){
    this.submitInfo();
  },
  
  submitInfo: function(){
    var that = this;
    
    $('.sub').click(function(){
      that.sendAjax();
    });
  },
  
  sendAjax: function(){
    $.ajax({
      url: '/',
      dataType: 'json',
      data: {yay: 'yaya'},
			method: "post",
			beforeSend: function() {},
      
			success: function(data, textStatus, jqXHR) {
			  if (jqXHR.status == 200){
          console.log('yes');
			  }
			}
    });
  }
}

var rapportClone;

$(function(){
  rapportClone = new RapportClone();
});