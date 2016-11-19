var parseDateTime = function(input) {
    
    var weekdayIndex = null, returnString = null;
    var todayIndex = dateToday.getDay(); // get weekday index for today
    
    // arrays for regex.indexOf(array)
    var longformDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ];
    var shortformDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat" ];
    
    // 24hrs in milliseconds
    var dayInMilliseconds = 24 * 60 * 60 * 1000;
    
    // test / verify input data
    if ( longformDay.indexOf( input.toLowerCase() ) !== -1 ) {
        weekdayIndex = longformDay.indexOf( input.toLowerCase() );
    } else if ( shortformDay.indexOf( input.toLowerCase() ) !== -1 ) {
        weekdayIndex = shortformDay.indexOf( input.toLowerCase() )
    } else if ( input.match(/(\d{1,2})[\/|\-|\.](\d{1,2})/) ) {
        var string = input.match(/(\d{1,2})[\/|\-|\.](\d{1,2})/);
         var month = parseInt(string[1]) - 1; // regExp capture group 1, months are from (0 - 11), integer.
           var day = parseInt(string[2]);     // regExp capture group 2, days are 1 - 31, integer.
        returnString = new Date(dateToday.getFullYear(), month, day );
        returnString = formatDate(returnString);
    } else if (input.toLowerCase() == "yesterday" || input.toLowerCase() == "yes" ) {
        returnString = formatDate ( new Date( dateToday - dayInMilliseconds) );
    } else if ( input.toLowerCase() == "today" ) {
        returnString = formatDate( dateToday );
    } else if ( input.toLowerCase() == "last week") {
        returnString = formatDate( new Date( dateToday - (7) * dayInMilliseconds ) );
    }
    
    // analyzing word-type input
    if (weekdayIndex != null ) {
        if (todayIndex > weekdayIndex) {
            // if index value of today is greater than, multiply the difference by 24hrs
            returnString = new Date( dateToday - (todayIndex - weekdayIndex) * dayInMilliseconds );
            returnString = formatDate(returnString); // format to mm/dd/yy
        } else if ( weekdayIndex > todayIndex ) {
            // if index value of todayIndex is less than weekdayIndex, 
            returnString = new Date( dateToday - (weekdayIndex - weekdayIndex + 6 ) * dayInMilliseconds );
            returnString = formatDate(returnString); // format to calendar
        } else if ( weekdayIndex == todayIndex ) { // 7 days ago , not "today"
            returnString = new Date( dateToday - (7) * dayInMilliseconds );
            returnString = formatDate(returnString); // format to calendar
        }
    }
    
    return returnString;
};

var verifyEmployeeList = function(employeeObject) {
    // verify employees Object from external .js file
    return typeof employees !== 'undefined' ? true : false;
};

var phoneValidation = /\({0,1}(\d{3}){0,1}\){0,1}[\ |\-|\.]{0,1}(\d{3})[\ |\-|\.]{0,1}(\d{4})/igm; //regex

var parseMessage = function(input, event) {
    
    // logic for callback number capture
    var callbackNumber = phoneValidation.exec(input); // parsed Object
    console.log(callbackNumber);
    console.log( typeof callbackNumber[1] === 'undefined');
    var callBackField = event.target.parentElement.parentElement.getElementsByClassName('callback-number')[0];
    // if space is blank, fill it.
    if ( callBackField.value.trim().length === 0) {
        var value = [];
        for ( var i = 3; i > 0 ; i-- ) {
            if ( typeof callbackNumber[i] !== 'undefined') {
                value.unshift(callbackNumber[i]);
            }
        }
        // set css background to opaque white
        callBackField.style.color = "rgba(255,255,255,1)";
        // set field value w/ parsed number;
        callBackField.value = value.join("-");
    }
    
};