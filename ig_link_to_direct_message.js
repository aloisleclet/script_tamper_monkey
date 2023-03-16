// ==UserScript==
// @name         instagram link to direct message
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //I need to directly go to a specific direct message user through a link
    //like : https://www.instagram.com/user/#directmessage -> request the direct message page, faster to have to manually click to the button.


  let direct_message = window.location.href.split('?')[1];

  if (direct_message == "directmessage")
  {
      var interval = setInterval(function(){
          //find Message button and click on it

          let button = Array.from(document.querySelectorAll('div[role="button"]'))
              .find(el => el.textContent === 'Message');

          if (button != undefined)
          {
            //simulate mouse over
            var event = new MouseEvent('mouseover', {
              'view': window,
              'bubbles': true,
              'cancelable': true
            });

            button.dispatchEvent(event);

            setTimeout(function () {

              let button = Array.from(document.querySelectorAll('div[role="button"]'))
                .find(el => el.textContent === 'Message');

                //click on message button
                button.click();
                console.log('click');
                clearInterval(interval);

                //reload page sometimes i got weird black screen
                setTimeout(function () {
                    window.location.reload();
                }, 3000);

            }, 400);

          }
      }, 600);

  }

})();



