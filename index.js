document.addEventListener('DOMContentLoaded', () => {
    let enabled = document.getElementById('enabled');
    const currentState = window.localStorage.getItem('hide_tooltips') === 'true';
    enabled.checked = currentState;
    enabled.addEventListener('click', (e) => {
        console.log('Setting in storage ', { hide_tooltips: e.target.checked });
        window.localStorage.setItem('hide_tooltips', e.target.checked);
        chrome.storage.sync.set({ hide_tooltips: e.target.checked });
    }, false);
}, false);

