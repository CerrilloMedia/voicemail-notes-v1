var parseDateTime = function(input) {
    
    var weekdayIndex = null, returnString = null;
    var todayIndex = dateToday.getDay(); // get weekday index for today
    
    // weekday array for indexOf
    var shortformDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat" ];
    
    // 24hrs in milliseconds
    var dayInMilliseconds = 24 * 60 * 60 * 1000;
    
    
    /// test / verify input data
    if ( input.match(/(\d{1,2})[\/|\-|\.](\d{1,2})/) ) {
        var string = input.match(/(\d{1,2})[\/|\-|\.](\d{1,2})/);
         var month = parseInt(string[1]) - 1; // regExp capture group 1, months are from (0 - 11), integer.
           var day = parseInt(string[2]);     // regExp capture group 2, days are 1 - 31, integer.
        // dealing with past dates, if the date input is greater than todays date, subtract a year.
        pastDate = new Date(dateToday.getFullYear(), month, day );
        if ( pastDate > dateToday ) {
            console.log(typeof pastDate);
            pastDate.setYear(pastDate.getFullYear() - 1);
        }
        returnString = formatDate(pastDate);
    } else if ( shortformDay.indexOf(input.slice(0,3).toLowerCase() ) !== -1 ) {
        // truncate input to first 3 chars.
        input = input.slice(0,3).toLowerCase();
        weekdayIndex = shortformDay.indexOf(input);
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
        } else if ( weekdayIndex >= todayIndex ) {
            // if index value of todayIndex is less than weekdayIndex, 
            returnString = new Date( dateToday - (todayIndex - weekdayIndex + 7 ) * dayInMilliseconds );
            returnString = formatDate(returnString); // format to calendar
        }
    }
    
    return returnString;
};

var verifyEmployeeList = function(employeeObject) {
    // verify employees Object from external .js file
    return typeof employees !== 'undefined' ? true : false;
};

var phoneValidation = /\+*1{0,1}[\ |\-|\.]{0,1}\({0,1}(\d{3}){0,1}\){0,1}[\ |\-|\.]{0,1}(\d{3})[\ |\-|\.]{0,1}(\d{4})[ ]*(extension\d+|ext\d+|x\d+)*/igm; //regex

var parseMessage = function(input, event) {
    
    // logic for callback number capture
    var callbackNumber = phoneValidation.exec(input); // parsed Object of 4 groups
    var callBackField = event.target.parentElement.parentElement.getElementsByClassName('callback-number')[0];
    
    // if phone field is empty, fill with data
    if ( callBackField.value.trim().length === 0 ) {
        var value = [];
        for ( var i = callbackNumber.length ; i > 0 ; i-- ) { // 3 capture groups starting from the last
            if ( callbackNumber[i] != null ) {
                value.unshift(callbackNumber[i]);
            }
        }
        // set field value w/ parsed number;
        callBackField.value = value.join(" ");
    }
      
};

