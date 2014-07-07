chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', msg.url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var title = (/<title>(.*?)<\/title>/m).exec(xhr.responseText)[1];
        port.postMessage({'title': title})
      }
    }
    xhr.send();
  });
});
