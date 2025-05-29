// ==UserScript==
// @name         Highlight Status Column in TDX
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Highlights keywords in the Status column.
// @author       James
// @match        https://tdx.vanderbilt.edu/TDNext/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    //_______________________________________________Highlight Colors_____________________________________
    const wordStyles = {
        "New": "color: green; font-weight: bold;",
        "In Process": "color: orange; font-weight: bold;",
        "Reopened": "color: red; font-weight: bold;",
    };

    function wrapWord(word, style) {
        return `<span style="${style}">${word}</span>`;
    }

    function highlightStatusColumn(table) {
        const headerCells = table.querySelectorAll('thead th');
        let statusColIndex = -1;

        headerCells.forEach((th, index) => {
            const text = th.textContent.trim().toLowerCase();
            if (text.includes('status')) {
                statusColIndex = index;
            }
        });

        if (statusColIndex === -1) return;

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > statusColIndex) {
                const cell = cells[statusColIndex];
                let html = cell.innerHTML;
                let changed = false;
                for (const word in wordStyles) {
                    const regex = new RegExp(`\\b(${word})\\b`, 'gi');
                    if (regex.test(html)) {
                        html = html.replace(regex, wrapWord(word, wordStyles[word]));
                        changed = true;
                    }
                }

                if (changed) {
                    cell.innerHTML = html;
                }
            }
        });
    }

    function waitForTablesAndHighlight() {
        const tables = document.querySelectorAll('table');
        let foundAny = false;

        tables.forEach(table => {
            if (table.dataset.tmProcessed) return;
            table.dataset.tmProcessed = "true";

            const headerCells = table.querySelectorAll('thead th');
            let hasStatus = false;

            headerCells.forEach(th => {
                if (th.textContent.trim().toLowerCase().includes('status')) {
                    hasStatus = true;
                }
            });

            if (hasStatus) {
                highlightStatusColumn(table);
                const observer = new MutationObserver(() => highlightStatusColumn(table));
                observer.observe(table, { childList: true, subtree: true });
                foundAny = true;
            }
        });
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            waitForTablesAndHighlight();
        }, 1000);
    });
})();
