var totalActiveMessages = 0;
var totalMessages = 0;

var newMessage = function() {
    
    var template = 
'        <section class="message-body" >'
+    '         <div class="message-number">#</div>'
+    '         <form>'
+    '                <div class="message-block-date">'
+    '                    day: <input type="date" name="messageDay" />'
+    '                </div>'
+    '                <div class="message-block-time">'
+    '                    time: <input type="time" name="messageTime" />'
+    '                </div>'
+    '                <div class="message-block-textarea">'
+    '                    message:<textarea class="messageTextArea" type="text"></textarea>'
+    '                </div>'
+    '            <a class="callBack">'
+    '                <span class="ion-ios-telephone"></span>'
+    '                <input class="callback-number"/>'
+    '            </a>'
+    '         </form>'
+    '            <div class="button-remove-message" title="">'
+    '                <span class="ion-ios-trash-outline"></span>'
+    '            </div>'
+    '    </section>';
    
    // set total messages to plus 1;
    var $template = $(template);
    
    $template.find('.button-remove-message').click(function() {
        removeMessage(event);
    });
    
    totalActiveMessages+=1;
    totalMessages+=1;
    $template.find('.message-number').append(totalMessages);
    return $template;
};

var setNewMessage = function() {
    var $messagesBody = $('#messages');
    $messagesBody.append(newMessage);
    console.log(totalActiveMessages);
};

var removeMessage = function(event) {
    var messageBody = $(event.target).parents('.message-body');
    if (totalActiveMessages > 1 ) {
        totalActiveMessages -= 1;
    } else {
        setNewMessage();
        totalActiveMessages = 1;
    }
    messageBody.remove();
    console.log(totalActiveMessages);
};

var getTodaysDate = function() {
    var date = new Date();
    return (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear().toString());
};

var setNavBar = function() {
  document.getElementsByClassName('todayDate')[0].innerHTML = getTodaysDate(true);
};

window.onload = function() {
    setNavBar();
    setNewMessage();
    document.getElementsByClassName('add-section')[0].addEventListener("click", setNewMessage);
};