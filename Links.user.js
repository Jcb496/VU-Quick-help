// ==UserScript==
// @name         Quick Links Menu
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Adds a floating button with quick links dropdown.
// @author       James
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// Main Button
    let button = document.createElement("button");
    button.id = "quick-links-button";
    button.innerText = "Links";
    Object.assign(button.style, {
        position: "fixed",
        top: "42px",
        left: "280px",
        backgroundColor: "#FFFFFF",
        color: "black",
        border: "thin",
        cursor: "pointer",
        fontSize: "16px",
        zIndex: "1000",
    });
    document.body.appendChild(button);

// Dropdown
    let dropdown = document.createElement("div");
    dropdown.id = "quick-links-dropdown";
    Object.assign(dropdown.style, {
        position: "fixed",
        top: "62px",
        left: "280px",
        color: "blue",
        background: "white",
        zIndex: "1000",
        display: "none",
    });

    function createOption(name, url) {
        let option = document.createElement("div");
        option.innerText = name;
        Object.assign(option.style, {
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
            color: "blue",
        });
        option.addEventListener("click", () => {
            window.open(url, "_blank");
        });
        return option;
    }

    // Add Links
    dropdown.appendChild(createOption("TDX", "https://tdx.vanderbilt.edu/TDNext/Home/Desktop/Default.aspx"));
    dropdown.appendChild(createOption("SailPoint", "https://idm-identity.app.vanderbilt.edu/identityiq/home.jsf"));
    dropdown.appendChild(createOption("Duo", "https://admin-d0c5c4b8.duosecurity.com/"));
    dropdown.appendChild(createOption("KB", "https://devops.app.vanderbilt.edu/confluence/login.action?os_destination=%2Fpages%2Fviewpage.action%3FspaceKey%3DITSD%26title%3DVUIT%2BService%2BDelivery%2BHome&permissionViolation=true"));
    dropdown.appendChild(createOption("Remote Session", "https://support.it.vanderbilt.edu/login/session_report/"));
    dropdown.appendChild(createOption("Textline", "https://application.textline.com/conversations"));
    dropdown.appendChild(createOption("Azure", "https://portal.azure.com/#home"));
    dropdown.appendChild(createOption("Oracle", "https://ecsr.fa.us2.oraclecloud.com/fscmUI/faces/FuseWelcome?_adf.ctrl-state=13zrd36hwv_1&_adf.no-new-window-redirect=true&_afrLoop=32697420056753999&_afrWindowMode=2&_afrWindowId=null&_afrFS=16&_afrMT=screen&_afrMFW=1920&_afrMFH=919&_afrMFDW=1920&_afrMFDH=1080&_afrMFC=8&_afrMFCI=0&_afrMFM=0&_afrMFR=96&_afrMFG=0&_afrMFS=0&_afrMFO=0"));
    dropdown.appendChild(createOption("Phones", "https://sso-login.vanderbilt.edu/idp/startSSO.ping?PartnerSpId=urn%3Aamazon%3Awebservices_aws_connect&TargetResource=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fconnect%2Ffederate%2F52cec302-bfc8-47ba-8b91-ab622f786605"));

    document.body.appendChild(dropdown);

    // Toggle Dropdown
    button.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", (event) => {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
})();
