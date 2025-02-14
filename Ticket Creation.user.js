// ==UserScript==
// @name         TDX Ticket Creation
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Creates a "Create Ticket" With "Request", "Incident", and "Home". Service, Requestor, KB, Responsible, and Location open for search. While also filling out Status, Impact, Urgency, and Source.
// @author       James
// @match        https://tdx.vanderbilt.edu/TDNext*
// @downloadURL  https://raw.githubusercontent.com/Jcb496/Scripts/main/Ticket%20Creation.user.js
// @updateURL    https://raw.githubusercontent.com/Jcb496/Scripts/main/Ticket%20Creation.user.js
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

//Main Button
    function createQuickTicketButton() {
        let button = document.createElement("button");
        button.innerText = "Create a Ticket";
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.color = "blue";
        button.style.border = "thin";
        button.style.cursor = "pointer";
        button.style.fontSize = "20px";
        button.style.zIndex = "1000";
        document.body.appendChild(button);

//DropDown
   //Style
        let dropdown = document.createElement("div");
        dropdown.style.position = "fixed";
        dropdown.style.bottom = "60px";
        dropdown.style.right = "20px";
        dropdown.style.color = "black";
        dropdown.style.border = "thin";
        dropdown.style.cursor = "pointer";
        dropdown.style.fontSize = "20px";
        dropdown.style.border = "3px solid #dddddd";
        dropdown.style.zIndex = "1000";
        dropdown.style.display = "none";

   //Options
        let requestOption = document.createElement("div");
        requestOption.innerText = "New Service Request";
        requestOption.style.backgroundColor = "white";
        requestOption.style.color = "blue";
        requestOption.style.cursor = "pointer";
        requestOption.style.fontSize = "14px";
        requestOption.style.border = "3px solid #dddddd";
        requestOption.onclick = () => window.location.href = "https://tdx.vanderbilt.edu/TDNext/Apps/34/Tickets/New?formId=6";

        let incidentOption = document.createElement("div");
        incidentOption.innerText = "New Incident";
        incidentOption.style.backgroundColor = "white";
        incidentOption.style.color = "blue";
        incidentOption.style.cursor = "pointer";
        incidentOption.style.fontSize = "14px";
        incidentOption.style.border = "3px solid #dddddd";
        incidentOption.onclick = () => window.location.href = "https://tdx.vanderbilt.edu/TDNext/Apps/34/Tickets/New?formId=11";

        let homeOption = document.createElement("div");
        homeOption.innerText = "Home";
        homeOption.style.backgroundColor = "white";
        homeOption.style.color = "blue";
        homeOption.style.cursor = "pointer";
        homeOption.style.fontSize = "14px";
        homeOption.style.border = "3px solid #dddddd";
        homeOption.onclick = () => window.location.href = "https://tdx.vanderbilt.edu/TDNext/Home/Desktop/Default.aspx";

//Adding Buttons to Web
        dropdown.appendChild(homeOption);
        dropdown.appendChild(incidentOption);
        dropdown.appendChild(requestOption);
        document.body.appendChild(dropdown);

        button.addEventListener("click", function() {
            dropdown.style.display = (dropdown.style.display === "none") ? "block" : "none";
        });
    }

// Assets
   // Finding & Selecting
    function clickElementsAfterRedirect() {
        const interval = setInterval(() => {
            const status = document.getElementById('attribute40');
            status.value = '83';
            const impact = document.getElementById('attribute369');
            impact.value = '12';
            const urgency = document.getElementById('attribute370');
            urgency.value = '18';
            const source = document.getElementById('attribute371');
            source.value = '5';
            const service = document.getElementById('attribute789_lookup');
            const requestor = document.getElementById('attribute495_lookup');
            const kb = document.getElementById('attribute1237_lookup');
            const responsible = document.getElementById('attribute1279_lookup');
            const location = document.getElementById('attribute701_lookup');

            if (service) {
                service.click();
            }
            if (requestor) {
                requestor.click();
            }
            if (kb) {
                kb.click();
            }
            if (responsible) {
                responsible.click();
            }
            if (location) {
                location.click();
            }
            if (service && requestor && kb && responsible && location) {
                clearInterval(interval);
            }
        }, 1000);
    }


// Looking Assests After Page Load
    function onServiceRequestPageLoad() {
        if (window.location.href.includes("formId=6")) {
            clickElementsAfterRedirect();
        }
    }
    function onIncidentPageLoad() {
        if (window.location.href.includes("formId=11")) {
            clickElementsAfterRedirect();
        }
    }


//Waiting on Page Load
    window.addEventListener('load', onServiceRequestPageLoad);
    window.addEventListener('load', onIncidentPageLoad);
    createQuickTicketButton();
})();
