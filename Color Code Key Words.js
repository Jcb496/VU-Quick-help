
// ==UserScript==
// @name         Color Code Key Words
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Color coding key words in TDX safely and efficiently
// @author       James
// @match        https://tdx.vanderbilt.edu/TDNext/Home*
// @downloadURL  https://github.com/Jcb496/VU-Quick-help/main/Color%20Code%20Key%20Words.js
// @updateURL    https://github.com/Jcb496/VU-Quick-help/main/Color%20Code%20Key%20Words.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const wordStyles = {
        "New": "color: green; font-weight: bold;",
        "In Process": "color: blue; font-weight: bold;",
        "Closed": "color: black; font-weight: bold;",
        "On Hold": "color: orange; font-weight: bold;",
        "Reopened": "color: red; font-weight: bold;",
    };

    function wrapWord(word, style) {
        return `<span class="tm-highlighted" style="${style}">${word}</span>`;
    }

    function highlightTextNodes(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: node => {
                if (
                    node.parentNode &&
                    node.parentNode.nodeName !== "SCRIPT" &&
                    node.parentNode.nodeName !== "STYLE" &&
                    !node.parentNode.classList.contains("tm-highlighted")
                ) {
                    return NodeFilter.FILTER_ACCEPT;
                }
                return NodeFilter.FILTER_REJECT;
            }
        });

        const nodes = [];
        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach(node => {
            let html = node.nodeValue;
            let changed = false;

            for (const word in wordStyles) {
                const regex = new RegExp(`\\b(${word})\\b`, 'g');
                if (regex.test(html)) {
                    html = html.replace(regex, wrapWord(word, wordStyles[word]));
                    changed = true;
                }
            }

            if (changed) {
                const span = document.createElement('span');
                span.innerHTML = html;
                node.parentNode.replaceChild(span, node);
            }
        });
    }

    function observeAndHighlight() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        highlightTextNodes(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        highlightTextNodes(document.body); // Initial run
    }

    window.addEventListener('load', () => {
        setTimeout(observeAndHighlight, 1000);
    });
})();
