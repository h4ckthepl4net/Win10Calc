function initMemoryOverlayItem() {
    let overlayContainer = document.getElementById('overlay-container');
    if (overlayContainer) {
        let memoryOverlay = document.createElement("DIV");
        memoryOverlay.id = 'memory-container-overlay';
        memoryOverlay.classList.add('memory-container-overlay');
        memoryOverlay.setAttribute('data-is-open', false);
        overlayContainer.appendChild(memoryOverlay);
    } else {
        throw "Error in function initMemoryOverlayItem(): Cannot find overlay container";
    }
}

function initHistoryOverlayItem() {
    let overlayContainer = document.getElementById('overlay-container');
    if (overlayContainer) {
        let memoryOverlay = document.createElement("DIV");
        memoryOverlay.id = 'history-container-overlay';
        memoryOverlay.classList.add('history-container-overlay');
        memoryOverlay.setAttribute('data-is-open', false);
        overlayContainer.appendChild(memoryOverlay);
    } else {
        throw "Error in function initHistoryOverlayItem(): Cannot find overlay container";
    }
}