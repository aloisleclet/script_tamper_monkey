// ==UserScript==
// @name         Round Cube prettyfy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mail.ovh.net/roundcube/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('new page : ' + document.location.href)

    var url_image_frame = "https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

    //change favicon
    let element_favicon = document.querySelector('link[rel="shortcut icon"]');
    if (document.body.contains(element_favicon))
      document.querySelector('link[rel="shortcut icon"]').setAttribute("href", "https://aloisleclet.fr/favicon-32x32.png?v=c8505b7a5fa716f45dfc629e6d52f701");

    document.title = "Mail :)"

    //change title & frame
    let element_messageframe = document.querySelector(`#messagecontframe`);

    let is_main_page = document.body.contains(element_messageframe);
    if (is_main_page)
    {

      //vim keybinding

      let current_message = 0;
      let current_frame_id = "#mailcontframe";
      let scrollPosition = 0;

      function toolbar_shortcut(e)
      {
        if (['x', 'n', 'r', 'f', 's', 'p', 'o', '/', 'Escape'].indexOf(e.key) != -1)
        {
          if (e.key == 'x')
            rcmail.command('delete','',this,event);
          else if (e.key == 'n')
            rcmail.command('compose','',this,event);
          else if (e.key == 'r')
            rcmail.command('reply','',this,event);
          else if (e.key == 'f')
            rcmail.command('forward','',this,event);
          else if (e.key == 's')
            rcmail.command('plugin.markasjunk2.junk','',this,event);
          else if (e.key == 'p')
            rcmail_ui.show_popup('markmenu');
          else if (e.key == 'o')
            rcmail_ui.show_popup('messagemenu');
          else if (e.key == '/')
            document.querySelector('#quicksearchbox').focus();
          else if (e.key == 'Escape')
          {
            document.querySelector('body').focus();
            document.querySelector('body').click();
          }
        }
      }

      function message_navigation(e)
      {
          if (current_frame_id == "#mailcontframe" && ['j', 'k'].indexOf(e.key) != -1)
          {
            if (e.keyCode == 13)//enter edit mode
              document.querySelectorAll(".message a")[current_message].click();
            else if (e.keyCode == 106 || e.keyCode == 107) //mesage navigation
            {
              if (e.keyCode == 106)//j
                current_message ++;
              else if (e.keyCode == 107)//k
                current_message --;

              //focus message
              document.querySelectorAll('.message').forEach(function (e) {
                e.classList.remove('selected');
                e.classList.remove('focused');
              });

              document.querySelector("#messagelistheader").blur();
              document.querySelectorAll(".message a")[current_message].focus();

              //update preview
              let uid = document.querySelectorAll('.message a')[current_message].href.split("uid=")[1].split("&")[0];
              element_messageframe.src = 'https://mail.ovh.net/roundcube/?_task=mail&_caps=pdf%3D1%2Cf…D0%2Cwebp%3D1&_uid='+uid+'&_mbox=INBOX&_framed=1&_action=preview';

              document.querySelectorAll(".message")[current_message].focus();
              document.querySelectorAll(".message")[current_message].click();
              document.querySelectorAll('.message')[current_message].classList.add('selected');
              document.querySelectorAll('.message')[current_message].classList.add('focused');

            }
          }
      }

      function mail_scroll(e)
      {
          if (current_frame_id == "#mailpreviewframe" && ['j', 'k'].indexOf(e.key) != -1)
          {
            if (e.keyCode == 106)//j
              scrollPosition += 100;
            else if (e.keyCode == 107)//k
              scrollPosition -= 100;

            console.log(scrollPosition);

            document.querySelector('#mailpreviewframe').children[0].contentWindow.document.documentElement.scrollTop = scrollPosition;

          }

      }

      function frame_navigation(e)
      {

        let is_replying = false;

        if (!is_replying && ['h', 'l'].indexOf(e.key) != -1)
        {

          if (current_frame_id == "#mailboxlist-container" && e.key == 'l')// folder -> message
          {
              current_frame_id = '#mailcontframe';
          }
          else if (current_frame_id == "#mailcontframe")
          {
            if (e.key == 'l')//l message -> main
            {
              current_frame_id = '#mailpreviewframe';
            }
            else if (e.key == 'h')//h message -> folder
            {
              current_frame_id = '#mailboxlist-container';
            }

          }
          else if (current_frame_id == "#mailpreviewframe" && e.key == 'h')// h main -> message
          {
              current_frame_id = '#mailcontframe';
          }

          //set focus
          document.querySelector('#mailcontframe').classList.remove('focus');//message
          document.querySelector('#mailpreviewframe').classList.remove('focus'); //main
          document.querySelector('#mailboxlist-container').classList.remove('focus');//folder
          document.querySelector(current_frame_id).classList.add('focus');
          document.querySelector(current_frame_id).focus();
          document.querySelector(current_frame_id).click();

          //current frame_id
          console.log(current_frame_id);
        }

      }

      document.onkeypress = function (e) {

        let is_edit_frame_open = document.body.contains(document.querySelector('.attachement-name'));

        if (is_edit_frame_open)
        {
          console.log('edit frame keybinding here');
          return (0);
        }

        e = e || window.event;

        console.log(e);

        frame_navigation(e);
        message_navigation(e);
        mail_scroll(e);
        toolbar_shortcut(e)
      };

    }
    else //other page
    {


    }

    setInterval(
      function() {
        document.title = document.title.split(")")[0] + ") Mail"
      }, 60000
    )

    //css fix, darkmode, and space management

    let head = document.head || document.getElementsByTagName('head')[0];

    let style = document.createElement('style');
    style.type = 'text/css';

    // create your CSS as a string
    var css = `

    .focus
    {
      border: 1px solid red !important;
    }

    body
    {
      background-color:black;
    }

    body > #message
    {
      filter:invert(100%);
    }

    #logo
    {
      width:0px;
      height:0px;
    }

    #messagelist
    {
      border:0 !important;
    }

    #mailpreviewframe iframe
    {
      transition:all ease 0.3s;
    }


    #messagetoolbar
    {
      top:0px;
      left:12px;
      z-index:10;
      min-width:400px;
      width:410px;
    }

    #mainscreen
    {
      top:42px;
    }

    #taskbar
    {
      width:300px;
      left:auto !Important;
      background: url("") !important;
    }

    #taskbar a
    {
      background: url("");
    }

    .button, .buttonPas
    {
      width:20px !important;
      height:20px !important;
      margin:8px !important;
      filter: invert(100%);
    }

    .button.compose,
    .buttonPas.compose
    {
      transform: scale(1.2);
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/7.1.0/240/iconmonstr-plus-square-lined.png");
    }

    .button.checkmail,
    .buttonPas.checkmail
    {
      position:fixed;
      top:-1000px;
    }

    .button.reply,
    .buttonPas.reply
    {
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-undo-4.png");
    }

    .button.replyAll,
    .buttonPas.replyAll
    {
      transform: scale(1.2);
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-arrow-59.png");
      transform: rotateY(180deg)
    }

    .button.forward,
    .buttonPas.forward
    {
      transform: scale(1.2);
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-arrow-59.png");
      margin-right:calc(3vw) !Important;
    }

    .button.delete,
    .buttonPas.delete
    {
      transform: scale(1.2);
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/7.7.0/240/iconmonstr-trash-can-lined.png");
    }

    .button.markasjunk2,
    .buttonPas.markasjunk2
    {
      transform: scale(1.2);
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-virus-6.png");
      margin-right:calc(3vw) !Important;
    }

    .button.markmessage,
    .buttonPas.markmessage
    {
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2013/240/iconmonstr-pin-2.png");
    }

    .button.messagemenu,
    .buttonPas.messagemenu
    {
      content: url("https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-gear-2.png");
    }

    #quicksearchbar
    {
      top:8px;
      right:calc(50vw - 200px);
      filter:invert(100%);
    }

    img[src="images/watermark.gif"]
    {
      width:100vw;
      height:100vw;
      content: url("`+url_image_frame+`") !important;
      filter:invert(100%);
    }

    .header.subject, .header.date,
    {
      color:black;
    }

    #mailboxlist-container, #mailcontframe, #mailpreviewframe, #compose-contacts, #compose-container
    {
      filter:invert(100%);
    }

    #mailpreviewframe img
    {
      filter:invert(100%);
    }

    body#tinymce
    {
      background-color:white !Important;
      color: black !Important;
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

