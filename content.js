$('a').each(function(index) {
  var a_tag = this;
  if(!$(this).attr("href").match(/https:\/\/github\.com\/.*\/(pull|issues)\/[0-9]*/)) {
    return;
  }
  
  var href_eq_title = $(this).text() == $(this).attr("href")
  var short_title   = /.*#[0-9]+$/.test($(this).text())

  if(!(href_eq_title || short_title)) {
    return;
  }
  
  var port = chrome.extension.connect();
  port.postMessage({'url' : $(this).attr("href")});
  port.onMessage.addListener(function(msg) {
    $(a_tag).text(msg.title);
  });
});

