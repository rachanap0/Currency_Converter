chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'convertCurrency',
        title: 'Convert Currency to USD',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'convertCurrency') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: findAndConvertCurrencies
        });
    }
});