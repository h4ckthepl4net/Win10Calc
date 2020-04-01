/** Dynamic imports **/

function importAll() {
    importComponents();
}

/*** Dynamic imports ***/

/** Custom elements/components **/

function importComponents() {
    import('./components/index.js').then((module) => {
        window.Components = Object.values(module);
        defineCustomElements(window.Components);
    });
}
function defineCustomElements(componentsArr) {
    componentsArr.forEach((component) => {
        component.defineElement();
    });
}

/*** Custom elements/components ***/

/** Menu buttons **/

function markActiveButton() {
    if (typeof markActiveButton.activeButtonIndex === 'undefined') {
        markActiveButton.activeButtonIndex = -1;
    }
    let activeButtonIndex = markActiveButton.activeButtonIndex;
    let topBarTitle = document.getElementById('top-bar-title').innerText.toLowerCase();
    if (topBarTitle) {
        let menuButtonsSelectedMarks = Array.from(document.getElementsByClassName('menu-button-active-mark'));
        if (activeButtonIndex >= 0) {
            menuButtonsSelectedMarks[activeButtonIndex].setAttribute('data-is-active', false);
        }
        activeButtonIndex = Array.from(document.getElementsByClassName('menu-button-txt'))
            .findIndex((el) => el.innerText.toLowerCase() == topBarTitle);
        if (activeButtonIndex >= 0) {
            menuButtonsSelectedMarks[activeButtonIndex].setAttribute('data-is-active', true);
        }
    }
}
function navigateToAnotherCalcType(event) {
    window.location = event.target.getAttribute('data-href');
}

/*** Menu buttons ***/

/** Overlay **/ 

function overlay() {
    if (!overlay.openItems) {
        overlay.openItems = [];
    }
}
function toggleOverlayItem(elementId, options = {}) {
    let overlayContainer = document.getElementById('overlay-container');
    if (overlayContainer) {
        let element = document.getElementById(elementId);
        if (overlayContainer.contains(element)) {
            let attrValue = (element.getAttribute('data-is-open') === 'true');
            element.setAttribute('data-is-open', (!attrValue).toString());
            if (!attrValue) {
                overlay.openItems.push({
                    element,
                    overlayClass: options.overlayClass,
                    closeOverlayOnClick: !!options.closeOverlayOnClick
                });
                if(options.overlayClass) {
                    overlayContainer.classList.add(options.overlayClass);
                }
            } else {
                let index = overlay.openItems.findIndex((arrEl) => arrEl.element === element);
                if (index >= 0) {
                    let arrEl = overlay.openItems.splice(index, 1);
                    if(arrEl.overlayClass) {
                        overlayContainer.classList.remove(arrEl.overlayClass);
                    }
                }
            }
            if (overlay.openItems.reduce((totalCnt, el) => totalCnt + el.closeOverlayOnClick, 0) == 0) {
                overlayContainer.style.pointerEvents = 'none';
            } else {
                overlayContainer.style.pointerEvents = 'all';
            }
        } else {
            throw "Error in function toggleOverlayItem(): Element with mentioned id is not inside overlay container";
        }
    } else {
        throw "Error in function toggleOverlayItem(): Cannot find overlay container";
    }
}
function overlayClickHandler(event) {
    let overlayContainer = document.getElementById('overlay-container');
    if (event.target === overlayContainer) {
        if (overlayContainer) {
            let index = overlay.openItems.findLastIndex((el) => el.closeOverlayOnClick);
            let arrEl = {};
            if (index >= 0) {
                arrEl = overlay.openItems.splice(index, 1)[0];
            }
            if (overlayContainer.contains(arrEl.element)) {
                let attrValue = (arrEl.element.getAttribute('data-is-open') === 'true');
                arrEl.element.setAttribute('data-is-open', (!attrValue).toString());
                if (attrValue === false) {
                    throw "Error in function overlayClickHandler(): Mentioned overlay element is already closed";
                }
                if(arrEl.overlayClass) {
                    overlayContainer.classList.remove(arrEl.overlayClass);
                }
                if (overlay.openItems.reduce((totalCnt, el) => totalCnt + el.closeOverlayOnClick, 0) == 0) {
                    overlayContainer.style.pointerEvents = 'none';
                }
            } else {
                throw "Error in function overlayClickHandler(): Last element opened with overlay is not inside overlay container";
            }
        } else {
            throw "Error in function overlayClickHandler(): Cannot find overlay container";
        }
    }
}
function closeAllOpenOverlayItems() {
    if(overlay.openItems.length) {
        let overlayContainer = document.getElementById('overlay-container');
        if (overlayContainer) {
            overlay.openItems.forEach((arrEl, index) => {
                if (overlayContainer.contains(arrEl.element)) {
                    let attrValue = (arrEl.element.getAttribute('data-is-open') === 'true');
                    if (attrValue === false) {
                        throw `Error in function closeAllOpenOverlayItems(): Overlay element at index ${index} is already closed`;
                    }
                    arrEl.element.setAttribute('data-is-open', (!attrValue).toString());
                } else {
                    throw `Error in function closeAllOpenOverlayItems(): Element at index ${index} is not inside overlay container`;
                }
            });
            overlay.openItems = [];
            overlayContainer.style.pointerEvents = 'none';
            overlayContainer.setAttribute('class', 'overlay-container');
        } else {
            throw "Error in function closeAllOpenOverlayItems(): Cannot find overlay container";
        }
    }
}

/*** Overlay ***/

(function main() {
    importAll();
    markActiveButton();
    overlay();
})()