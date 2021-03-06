var totalActiveMessages = 0;
var totalMessages = 0;
var dateToday = new Date();
var themeColor = "";

var newMessage = function(totalMessages) {
    
    var template = 
'        <div class="message-block" >'
+    '        <section class="message-anchor" >'
+    '            <div class="button-remove-message">'
+    '                <span class="ion-close"></span>'
+    '            </div>'
+    '          <section class="anchor" ></section>'
+    '        </section>'
+    '        <section class="message-body" >'
+    '         <form>'
+    '                <div class="message-block-date">'
+    '                    <span class="ion-calendar"></span>'    
+    '                    <input type="text" name="messageDay" placeholder="mm/dd or sun"/>'
+    '                </div>'
+    '                <div class="message-block-time">'
+    '                    <span class="ion-clock"></span>'
+    '                    <input type="time" name="messageTime" />'
+    '                </div>'
+    '                <div class="message-block-textarea">'
+    '                    <span class="line-break"></span>'
+    '                    <span class="ion-document-text"></span>'
+    '                    <span class="line-break"></span>'
+    '                    <textarea class="messageTextArea" type="text" rows="2"></textarea>'
+    '                </div>'
+    '            <a class="callBack">'
+    '                <span class="ion-ios-telephone"></span>'
+    '                <input class="callback-number"/>'
+    '            </a>'
+    '         <div class="message-number">#</div>'
+    '         </form>'
+    '    <span class="note-perforation">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span>';
+    '    </div>'
    
    var $template = $(template);
    
    // attach listener to delete-button
    $template.find('.button-remove-message').click(function() {
        removeMessage(event);
    });
    
    // attach listener to date field - logic fowarded to parseDateTime
    $template.find('input[name="messageDay"]').on("focusout", function(event) {
        var input = $(event.target).val();
        if (input.toLowerCase() === "help") {
            showHelpWindow();
        } else if (input) {
            event.target.value  = parseDateTime(input);
        }
    });
    
    // attach listener to textArea upon exit to parseMessage
    $template.find('textarea[class="messageTextArea"]').on("focusout", function(event) {
        var input = (event.target).value;
        if (input.trim().length > 0 ) {
            parseMessage(input, event);
        }
    });
    
    // add event listener to text area manual resize for root-anchor length
    $template.find('.messageTextArea').on('mousedown', function (event) {
        // establish current textArea height
        var textArea = $(event.target).css("height");
        
        // fire changeRootLength() when messageTextArea is 'dragged'
        $(window).on('mousemove', function(e) {
            if ( $(e.target).css("height") != textArea ) {
                changeRootLength();
            }
        });
    });
    
    // add event listener to phone number field. change CSS to reflect phone field is filled w/ data
    $template.find('.callback-number').on("focusin focusout keypress", function(event) {
        var phoneIcon = $(event.target.parentElement.getElementsByClassName('ion-ios-telephone')[0]);

        if (event.target.value !== "") {
            phoneIcon.css("color", "rgba(255,255,255,1)");
        } else {
            phoneIcon.css("color", "rgba(255,255,255,.3)");
        }
    });
    
    // update message number
    $template.find('.message-number').append(totalMessages);
    
    return $template;
};

// END ADD MESSAGE

// alter the root size of each message element when text-area window is resized
var changeRootLength = function() {
    var messageBox = document.getElementById('messages');
    var rootElement = document.getElementsByClassName('root')[0];
    var button = document.getElementById('add-section');
    var buttonMarginTop = parseInt(window.getComputedStyle(button).marginTop,10);
    rootElement.style.height = messageBox.clientHeight + buttonMarginTop + "px";
};


// set message anchor width
var setAnchor = function() {
   var rootObject = document.getElementsByClassName('root')[0];
   var messageAnchorObject = document.getElementsByClassName('message-anchor')[0];
   var messageAnchor = document.getElementsByClassName('anchor')[0];
    
   var rootDistance = (parseFloat($(messageAnchorObject).css("width")) -  parseFloat($(rootObject).css("width")) ) / 2;
   
   // set anchor width
    $('.anchor').css("width", rootDistance + "px");
    
   // horizontally center delete button within anchor element.
   $('.button-remove-message').css("left", ((parseFloat($(messageAnchorObject).css("width")) -  parseFloat($('.button-remove-message').css("width")) ) / 2 ) + "px");
    
   // horizontally center message root element to anchor element width.
   $('.root').css("left", rootDistance + "px");
    
   // horizontally center new-message button to anchor element width
    $('#add-section').css("left", ((parseFloat($(messageAnchorObject).css("width")) -  parseFloat($('#add-section').css("width")) ) / 2 ) + "px");
   $('#add-section').css( "margin", "inherit");
};

var setNewMessage = function() {
    var $messagesBody = $('#messages');
    totalActiveMessages+=1;
    totalMessages+=1;
    
    // appends a new message and triggers the counter
    var newMessageBlock = newMessage(totalMessages);
    $messagesBody.append( newMessageBlock);
    
    // scroll to the bottom of the page to view newest message field
    window.scroll(0, document.body.scrollHeight);
    
    // adjust horizontal anchor width as well as vertical root bar
    $(window).resize();
    changeRootLength();
    setThemeColor(themeColor);
    
    // as soon as new blank message is created, focus on date field
    $($(document).find('input[name="messageDay"]')[totalActiveMessages - 1]).focus();
};

var removeMessage = function(event) {
    var messageBody = $(event.target).parents('.message-block');
    messageBody.remove();
    // if there is 
    if ( totalActiveMessages == 1 ) {
        setNewMessage();
    } else {
        changeRootLength();
    }
    totalActiveMessages-=1;
};


var setThemeColor = function(color) {
    themeColor = color.toString();
    $(document.body).css("background-color", color);
    $('.topBar-clipping').css("background-color", color);
    $('.note-perforation').css("color", color);
};

var formatDate = function(dateObject) {
    return (dateObject.getMonth()+1 + "/" + dateObject.getDate() + "/" + dateObject.getFullYear().toString());
};

var toggleMenu = function() {
    var menu = $('#topFloatingMenu');
    
    if ( menu.is(':visible') ) {
        menu.slideUp(100);
    } else {
        menu.slideDown(200);
    }
    
    // include a close window button to menu
    $('#close-floating-menu').on('click', toggleMenu );
};

var setNavBar = function() {
    // set today's date
    document.getElementsByClassName('todayDate')[0].innerHTML = formatDate(dateToday);
    
    // establish colors in menu
    setColorPickMenu();
    
    // add listener to show/hide top menu
    $('#menu-button').on('click', toggleMenu );
    
    // 
    $('.colorButton').on('click', function(event) {
        themeColor =  $(event.target).data("color");
        setThemeColor(themeColor);
    });
};

var setColorPickMenu = function() {
    // setUp the button colors in the menu to the colors specified in the data-color attribute
    var colors = $('.colorButton');
    for ( var i = 0; i < colors.length ; i++ ) {
        var background = $(colors[i]).data("color");
        $(colors[i]).css("background", background );
    }
}

window.onload = function() {
    // set NavBar data & menu's
    setNavBar();
    // Event listener to add-message button
    document.getElementById('add-section').addEventListener("click", setNewMessage);
    // Event anchor/root resize to window.resize handler
    $(window).resize(function(){
        //changeRootLength();
        setAnchor();
        // set width of top-bar clipping to not clip above message
        $('.topBar-clipping').css("width", $(document.getElementsByClassName('message-anchor')[0]).css("width") );
        // mobile resize for topBar & delete buttons
        if (this.innerWidth < 551) {
            $('.topBar-clipping').css("width", "100%");
            $('.button-remove-message').css("left", "0px");
        }
    });
    // add first message to block
    setNewMessage();
    
    // set CTRL+m as new message
    $(document).keydown(function(e) {
        if (e.keyCode == 77 && e.ctrlKey) {
            setNewMessage();
        }
    });
    
};