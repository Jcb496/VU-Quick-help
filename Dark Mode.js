// ==UserScript==
// @name         Dark Mode Toggle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a dark mode toggle button.
// @author       James
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function applyInversion(enabled) {
        if (enabled) {
            document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
            localStorage.setItem('global-dark-mode', 'true');
        } else {
            document.documentElement.style.filter = "none";
            localStorage.setItem('global-dark-mode', 'false');
        }
    }

    function createToggleButton() {
        const button = document.createElement('button');
        button.id = 'darkModeToggleBtn';
        button.textContent = 'Toggle Dark Mode';
        button.style.position = 'fixed';
        button.style.bottom = '25px';
        button.style.left = '25px';
        button.style.backgroundColor = 'Black';
        button.style.color = 'White';
        button.style.fontSize = '14px';
        button.style.border = '5px';

        const saved = localStorage.getItem('global-dark-mode') === 'true';
        applyInversion(saved);

        button.addEventListener('click', () => {
            const current = localStorage.getItem('global-dark-mode') === 'true';
            applyInversion(!current);
        });

        document.body.appendChild(button);
    }


    window.addEventListener('load', () => {
        setTimeout(() => {
            createToggleButton();
        }, 1000);
    });
})();
