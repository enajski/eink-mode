var plEnajskiEInkLastMove = null;

function startup() {
    var el = document.getRootNode();
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchstart", handleMove, false);
    el.addEventListener("touchmove", handleMove, false);
}

function handleMove(evt) {
    plEnajskiEInkLastMove = evt;
}

function handleEnd(evt) {

    // Don't do anything on drag
    if (plEnajskiEInkLastMove.type == "touchmove") {
        return false;
    }

    let evtX = plEnajskiEInkLastMove.touches[plEnajskiEInkLastMove.touches.length - 1].clientX;
    let evtY = plEnajskiEInkLastMove.touches[plEnajskiEInkLastMove.touches.length - 1].clientY;

    let windowX = window.innerWidth;
    let windowY = window.innerHeight;

    let ignoredTargets = new Set(["A", "BUTTON", "INPUT"]);

    if (evt.target != null) {
        var nodeName = evt.target.nodeName;

        let targetParent = evt.target.parentElement;

        if (targetParent != null) {
            var parentNodeName = targetParent.nodeName;
        } else {
            var parentNodeName = "";
        }
    } else {
        var nodeName = "";
        var parentNodeName = "";
    }

    if (!ignoredTargets.has(nodeName) &&
        !ignoredTargets.has(parentNodeName)) {

        if (evtX > (windowX / 2)) {
            var increment = 1;
        } else {
            var increment = -1;
        }

        window.scrollByPages(increment);
        evt.preventDefault();
    }
}

document.addEventListener("DOMContentLoaded", startup);
