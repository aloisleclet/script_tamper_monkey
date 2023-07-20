// ==UserScript==
// @name         spotify enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  enhancer for spotify: drop premium + install app buttons
// @author       You
// @match        https://open.spotify.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //drop buttons
    document.querySelector('button[title="Upgrade to Premium"]').style.visibility = "hidden";
    document.querySelector('a.Button-sc-qlcn5g-0.cabTyT').style.visibility = "hidden";

})();
