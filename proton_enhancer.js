// ==UserScript==
// @name         Proton Calendar enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  vim shortcut on proton calendar, maximize the display space, kill logos, possibility to add different colors with flags 
// @author       aloisleclet
// @match        https://calendar.proton.me/*
// @icon         data:image/gif;base64,R0lGOlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

      document.title = "Calendar";

      //drop loaders logos
      setTimeout(function () {
        console.log('drop loader');
        document.querySelector('.w10e').remove();
        document.querySelector('.color-weak').innerHTML = 'calendar is loading.';
        document.title = "Calendar"
      }, 1000);


      //drop top bar
      setTimeout(function () {
        document.body.style.paddingTop="20px"
        document.querySelector('.logo-container').remove();
        document.querySelector('header').remove();
        document.title = "Calendar - " + document.title.split(" - ")[0];
      }, 20000);


      function waitForElm(selector)
      {
         return new Promise(resolve => {
              if (document.querySelector(selector)) {
                  return resolve(document.querySelector(selector));
              }
      
              const observer = new MutationObserver(mutations => {
                  if (document.querySelector(selector)) {
                      resolve(document.querySelector(selector));
                      observer.disconnect();
                  }
              });
      
              observer.observe(document.body, {
                  childList: true,
                  subtree: true
              });
          });
      }

      function flags()
      {
        
        //let events = document.querySelectorAll('.calendar-dayeventcell-title');
 
        waitForElm('.calendar-dayeventcell-title').then((events) => {

          let flags = [
            {label: "[TDC]", color: "red"},
            {label: "Anniv", color: "green"}
          ];

          events.forEach(function (el) {

            for (let i = 0; i < flags.length; i++)
            {
              if (el.innerHTML.indexOf(flags[i].label) != -1)
              {
                el.parentElement.parentElement.parentElement.style.borderColor = flags[i].color;
              }
            }

          });
        }); 
      }

      function shortcuts(e)
      {

        let is_adding_event = document.querySelectorAll('.eventpopover').length > 0;

        let previous = document.querySelectorAll('.flex .flex-item-noshrink .toolbar-button')[1];
        let next = document.querySelectorAll('.flex .flex-item-noshrink .toolbar-button')[2]; //j k for changing month
        if (!is_adding_event && ['j', 'k',].indexOf(e.key) != -1)
        {

          if (e.key == 'k')
          {
            previous.click();
          }
          else if (e.key == 'j')
          {
            next.click();
          }

        }

      }

      document.onkeypress = function (e) {
        shortcuts(e);
      };

})();

