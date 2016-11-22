var totalActiveMessages = 0;
var totalMessages = 0;
var dateToday = new Date();

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
    
    // attach listener to date field upon exit
    $template.find('input[name="messageDay"]').on("focusout", function(event) {
        var input = $(event.target).val();
        if (input.toLowerCase() === "help") {
            showHelpWindow();
        } else if (input) {
            event.target.value  = parseDateTime(input);
        }
    });
    
    // attach listener to date field upon exit
    $template.find('textarea[class="messageTextArea"]').on("focusout", function(event) {
        var input = (event.target).value;
        if (input.trim().length > 0 ) {
            parseMessage(input, event);
        }
    });
    
    // add event listener to text area manual resize
    $template.find('.messageTextArea').on('mousedown', function (event) {
        // establish current textArea height
        var textArea = $(event.target).css("height");
        
        // fire changeRootLength() when window is resized
        $(window).on('mousemove', function(e) {
            if ( $(e.target).css("height") != textArea ) {
                changeRootLength();
            }
        });
    });
    
    
    
    // update message number
    $template.find('.message-number').append(totalMessages);
    
    return $template;
};

// alter the root size of each message element
var changeRootLength = function() {
    var messageBox = document.getElementById('messages');
    var rootElement = document.getElementsByClassName('root')[0];
    var button = document.getElementsByClassName('add-section')[0];
    var buttonMarginTop = parseInt(window.getComputedStyle(button).marginTop,10);
    rootElement.style.height = messageBox.clientHeight + buttonMarginTop + "px";
};

// menu specific funciton?
var openMenuItem = function(menuobject) {
    
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
    $('.add-section').css("left", ((parseFloat($(messageAnchorObject).css("width")) -  parseFloat($('.add-section').css("width")) ) / 2 ) + "px");
   $('.add-section').css( "margin", "inherit");
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

// unused extra's == begin
var updateToBackgroundColor = function() {
    var color = $(document.body).css("background-color");
    $('.topBar-clipping').css("background-color", color);
    $('.note-perforation').css("color", color);
}
// unused extra's == begin

var formatDate = function(dateObject) {
    return (dateObject.getMonth()+1 + "/" + dateObject.getDate() + "/" + dateObject.getFullYear().toString());
};

var setNavBar = function() {
  document.getElementsByClassName('todayDate')[0].innerHTML = formatDate(dateToday);
    
  // add color picker for top menu
};

window.onload = function() {
    setNavBar();
    // Event listener to add-section button
    document.getElementsByClassName('add-section')[0].addEventListener("click", setNewMessage);
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
        updateToBackgroundColor();
    });
    setNewMessage();
};