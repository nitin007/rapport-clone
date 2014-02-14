var RapportClone = function() {
  this.init();
}

RapportClone.prototype = {
  init: function() {
    this.submitInfo();
  },

  submitInfo: function() {
    var that = this;

    $('.sub').click(function() {
      that.sendAjax(that.getUserNames());
    });
  },

  getUserNames: function() {
    var users = {};
    users.fbUser = $('#fbuser').val();
    users.ghUser = $('#ghuser').val();
    users.twUser = $('#twuser').val();
    users.gmUser = $('#gmuser').val();
    users.ywUser = $('#ywuser').val();
    return users;
  },

  sendAjax: function(userNames) {
    $.ajax({
      url: '/',
      dataType: 'json',
      data: userNames,
      method: "post",
      beforeSend: function() {},

      success: function(data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          var tw_user = data.tw[0].user;
          var user_info = { name: tw_user.name, screen_name: tw_user.screen_name, description: tw_user.description, fav_count: tw_user.favourites_count, flwrs_count: tw_user.followers_count, following: tw_user.friends_count, pro_img: tw_user.profile_image_url }
          
          
          
          $('.query-block').hide();
          $('.response-block').show();
          $('.fb-res').append("<span>"+JSON.stringify(data.fb)+"</span>&nbsp<img src=https://graph.facebook.com/"+data.fb.id+"/picture />");
          debugger;
          $('.yw-res').append("<span>"+JSON.stringify(data.yt)+"</span>&nbsp<img src="+user_info.pro_img+" />");
          $('.tw-res .user-info').append("<user>"+ JSON.stringify(user_info) +"</user>");
          $('.gm-res').append("<img src="+data.gm+" />");
        }
      }
    });
  }
}

var rapportClone;

$(function() {
  rapportClone = new RapportClone();
});
