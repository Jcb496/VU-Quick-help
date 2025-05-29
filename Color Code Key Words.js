
// ==UserScript==
// @name         Highlight Status Column
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Highlights keywords in the Status column.
// @author       James
// @match        https://tdx.vanderbilt.edu/TDNext/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const wordStyles = {
        "New": "color: green; font-weight: bold;",
        "In Process": "color: orange; font-weight: bold;",
        "Reopened": "color: red; font-weight: bold;",
        "On Hold": "color: blue; font-weight: bold;",
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
        tables.forEach(table => {
            // Use a custom attribute to avoid conflict with TDX's own data-tm-processed
            if (table.dataset.statusHighlighted) return;
            table.dataset.statusHighlighted = "true";

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
            }
        });
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            waitForTablesAndHighlight();
        }, 1000);

		SetInterval(() => {
			waitForTableAndHighlight();
		}, 2000);
    });
})();
