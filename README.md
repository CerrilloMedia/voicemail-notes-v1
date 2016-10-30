# voicemail-notes-v1
a tool jot down voicemail messages while at work (a salon) to quickly print.

A little something I put together to quickly jot down voicemails which I don't plan on keeping later. I work in retail so this is something to be able to type up with date and time, print then delegate to the team if need be.

HTML, Javascript * jQuery

__Current Functionality:__
* Each message is not-tracked at this moment so once a message is deleted or the window is closed, it's gone.
* One can add as many new messages which appends itself to the end of the messages block.
* Print-button which triggers the browser prints command

__Future Functionality:__ _for subsequent versions if time allows_
* add a unique [data] attribute to each message in case I'd like more options with altering the contents, setting an "undo-delete" option, setting extra attributes for later delegation (i.e. sorting, grouping & e-mailing certain messages to management or another recipient).
* replace the date format to a jquery/javascript function which self corrects to the date of the message. In my current case the voicemail system at work specifies the day (mon, tues, wed... of voicemessages instead of the numbered day. So I would look to create one text field with an event which would fire upon exiting the text block and update the block with [mm/dd @ HH:MM] using [new Date()] as a reference.
* Parse information out of the message such terms "reschedule", "to reschedule", "reschedule to", "call back", "cancel", phone numbers, e-mails, dates, etc.

_I'm currently going through a coding bootcamp so we'll see how the updates go._

Cheers!
