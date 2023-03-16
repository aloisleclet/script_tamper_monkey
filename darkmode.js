// ==UserScript==
// @name         darkmode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  dark mode for wikipedia
// @author       You
// @match        https://*.wikipedia.org/*
// @match        https://www.reddit.com/*
// @match        https://stackoverflow.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let head = document.head || document.getElementsByTagName('head')[0];

    let style = document.createElement('style');
    style.type = 'text/css';

    // create your CSS as a string
    var css = `

    body
    {
      filter:invert(100%);
    }
    `;

    // IE8 and below.
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    
    // add it to the head
    head.appendChild(style);


})();
