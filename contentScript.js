(() => {
    let currentState = false;
    const fetchState = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['hide_tooltips'], (obj) => {
                resolve(obj['hide_tooltips'] ? obj['hide_tooltips'] : false);
            });
        });
    };

    const hideTooltips = () => {
        const anchorTags = document.getElementsByTagName('a');
        for (const anchor of anchorTags) {
            if (anchor.href) {
                const temp = anchor.href;
                anchor.removeAttribute('href');
                anchor.addEventListener('click', () => window.location = temp);
            }
        }

    };

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync') {
            return;
        }
        if (changes.hide_tooltips.newValue) {
            hideTooltips();
        } else {
            window.location.reload();
        }
    });

    let observer = new MutationObserver((mutations) => mutations?.length > 0 && currentState && hideTooltips());

    observer.observe(document.body, {
        characterDataOldValue: true,
        subtree: true,
        childList: true,
        characterData: true
    });

    fetchState().then((isEnabled) => {
        if (isEnabled) {
            currentState = true;
            hideTooltips()
        } else {
            currentState = false
        }
    });
})();