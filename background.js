const CSS_FILE = 'slow-down-declarative-animations.css';
let tabs = new Map();

browser.browserAction.onClicked.addListener(tab => {
  if (tabs.has(tab.id)) {
    browser.tabs.removeCSS({ file: CSS_FILE, allFrames: true });
    tabs.delete(tab.id);
    browser.browserAction.setIcon({ path: 'gray-snail.svg' });
  } else {
    browser.tabs.insertCSS({ file: CSS_FILE, allFrames: true });
    tabs.set(tab.id, true);
    browser.browserAction.setIcon({ path: 'snail.svg' });
  }
});

browser.tabs.onActivated.addListener(activeInfo => {
  if (tabs.has(activeInfo.tabId)) {
    browser.browserAction.setIcon({ path: 'snail.svg' });
  } else {
    browser.browserAction.setIcon({ path: 'gray-snail.svg' });
  }
});
