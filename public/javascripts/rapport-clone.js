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
  
  paintTwitterInfo: function(tw){
    var tweets = {}
    if(typeof(tw) == 'object'){
      var tw_user = tw[0].user;
    
      var user_info = {
        name: tw_user.name,
        screen_name: tw_user.screen_name,
        description: tw_user.description,
        fav_count: tw_user.favourites_count,
        flwrs_count: tw_user.followers_count,
        following: tw_user.friends_count,
        pro_img: tw_user.profile_image_url
      }
      
      $.each(tw, function(i, v) {
        tweets[i] = v.text
      });
      
      $('.tw-res .user-info').append("<user>" + JSON.stringify(user_info) + "</user>&nbsp<img src=" + user_info.pro_img + " />");
      $('.tw-res .tweets').append("<tweets>" + JSON.stringify(tweets) + "</tweets>");
    }
  },
  
  paintGithubInfo: function(gh){
    if(typeof(gh) == 'object' && gh.length > 0){
      var repos = {};
      $.each(gh.slice(0, 5), function(i, v) {
        repos[i] = {
          clone_url: v.clone_url,
          collaborators_url: v.collaborators_url,
          created_at: v.created_at,
          default_branch: v.default_branch,
          description: v.description,
          forks_count: v.forks_count,
          full_name: v.full_name,
          git_url: v.git_url,
          html_url: v.html_url,
          has_wiki: v.has_wiki,
          language: v.language,
          master_branch: v.master_branch,
          private: v.private,
          ssh_url: v.ssh_url,
          url: v.url,
          watchers: v.watchers
        }
      });
      var gh_user_info = gh[0].owner;
      
      $('.gh-res .gh-user-info').append("<user>" + JSON.stringify(gh_user_info) + "</user> &nbsp<img src=" + gh_user_info.avatar_url + " />");
      $('.gh-res .gh-repos').append("<repos>" + JSON.stringify(repos) + "</repos>");      
    } else {
      $('.gh-res').append("<notf>" + gh + "</notf>");
    }
  },
  
  paintFbInfo: function(fb){
    $('.fb-res').append("<span>" + JSON.stringify(fb) + "</span>&nbsp<img src=https://graph.facebook.com/" + fb.id + "/picture />");
  },
  
  paintWeatherInfo: function(yt){
    $('.yw-res').append("<span>" + JSON.stringify(yt) + "</span>");
  },
  
  paintGmap: function(gm){
    $('.gm-res').append("<img src=" + gm + " />");
  },

  sendAjax: function(userNames) {
    var that = this;
    
    $.ajax({
      url: '/',
      dataType: 'json',
      data: userNames,
      method: "post",
      beforeSend: function() {},

      success: function(data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          $('.query-block').hide();
          $('.response-block').show();
          
          that.paintTwitterInfo(data.tw);
          that.paintGithubInfo(data.gh);
          that.paintFbInfo(data.fb);
          that.paintWeatherInfo(data.yt);
          that.paintGmap(data.gm);
        }
      }
    });
  }
}

var rapportClone;

$(function() {
  rapportClone = new RapportClone();
});
