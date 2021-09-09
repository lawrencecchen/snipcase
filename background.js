async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// async function move(tabId, index) {
//   try {
//     await chrome.tabs.move(tabId, { index: index });
//   } catch (e) {
//     setTimeout(() => move(tabId, index));
//   }
// }

function createKey(tab) {
  const { title, url } = tab;
  return encodeURIComponent(JSON.stringify({ title, url }));
}

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.debugger.attach({ tabId: tab.id }, "1.0");
  await chrome.debugger.sendCommand(
    { tabId: tab.id },
    "Page.captureScreenshot",
    async (result) => {
      console.log(result);
      // await chrome.debugger.detach({ tabId: tab.id });
      // await chrome.storage.sync.set({})
    }
  );

  await chrome.tabs.create({
    url: "ui/public/index.html",
    index: tab.index + 1,
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "snipcaseContextMenu",
    title: "Create Snipcase",
    contexts: ["selection"],
  });
});
