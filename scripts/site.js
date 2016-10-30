var totalActiveMessages = 0;

var newMessage = function() {
    
    var template = 
'        <section class="message-body" >'
+    '         <form>'
+    '                <div class="message-block-date">'
+    '                    day: <input type="date" name="messageDay" />'
+    '                </div>'
+    '                <div class="message-block-time">'
+    '                    time: <input type="time" name="messageTime" />'
+    '                </div>'
+    '                <div class="message-block-textarea">'
+    '                    message:<textarea class="messageTextArea" type="text" value=""></textarea>'
+    '                </div>'
+    '            </form>'
+    '            <a class="callBack">'
+    '                <span class="ion-ios-telephone"></span>'
+    '                <span class="callback-number"></span>'
+    '            </a>'
+    '            <a class="button-remove-message">'
+    '                <span class="ion-ios-trash-outline"></span>'
+    '            </a>'
+    '        </section>';
    
    // set total messages to plus 1;
    var $template = $(template);
    
    $template.find('.button-remove-message').click(function() {
        removeMessage(event);
    });
    
    totalActiveMessages+=1;
    return $template;
};

var setNewMessage = function() {
    var $messagesBody = $('#messages');
    $messagesBody.append(newMessage);
    console.log(totalActiveMessages);
};

var removeMessage = function(event) {
    $(event.target).parents('.message-body').remove();
    if (totalActiveMessages > 1 ) {
        totalActiveMessages -= 1;
    } else {
        setNewMessage();
        totalActiveMessages = 1;
    }
    console.log(totalActiveMessages);
};

var setNavBar = function() {
  var date = new Date();
  document.getElementsByClassName('todayDate')[0].innerHTML = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
};


window.onload = function() {
    setNavBar();
    //setNewMessage();
    document.getElementById('addMessage').addEventListener("click", setNewMessage);
};