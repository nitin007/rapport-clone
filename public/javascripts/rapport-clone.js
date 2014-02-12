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
      that.sendAjax(that.getUserNames());
    });
  },
  
  getUserNames: function(){
    var users = {};
    users.fbUser = $('#fbuser').val();
    users.ghUser = $('#ghuser').val();
    return users;
  },
  
  sendAjax: function(userNames){
    $.ajax({
      url: '/',
      dataType: 'json',
      data: userNames,
			method: "post",
			beforeSend: function() {},
      
			success: function(data, textStatus, jqXHR) {
			  if (jqXHR.status == 200){
          $('.response-block').prepend(data.fb.id + ' ' + data.name + ' ' + data.link).show();
          $('.query-block').hide();
			  }
			}
    });
  }
}

var rapportClone;

$(function(){
  rapportClone = new RapportClone();
});