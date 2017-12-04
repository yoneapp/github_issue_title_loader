const skipUrls = []
const titles = {}

let lock = false

const update = () => {
  if(lock == true) { return }
  lock = true

  Array.from(document.getElementsByClassName('edit-comment-hide'), edits => {
    Array.from(edits.getElementsByTagName('a'), el => {
      if(!el.href.match(/https:\/\/github\.com\/.*\/(pull|issues)\/[0-9]*/)) { return }
      if(el.textContent == el.href)                                                 { return }

      if(titles[el.href] && el.textContent != titles[el.href]) {
       el.textContent = titles[el.href]
       return
      }

      if(skipUrls.indexOf(el.href) >= 0) { return }
      skipUrls.push(el.href)

      const port = chrome.extension.connect()
      port.postMessage({'url' : el.href})
      port.onMessage.addListener(function(msg) {
        el.textContent = msg.title
        titles[el.href] = msg.title
      })
    })
  })

  lock = false
}

update()

document.addEventListener('DOMNodeInserted', () => {
  update()
})
