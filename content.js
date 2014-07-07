$('a').each(function(index) {
  var a_tag = this;
  if($(this).text().match(/https:\/\/github\.com\/.*\/issues\/[0-9]*/)) {
    var port = chrome.extension.connect();
    port.postMessage({'url' : $(this).text()});
    port.onMessage.addListener(function(msg) {
      $(a_tag).text(msg.title);
    });
  }
});

