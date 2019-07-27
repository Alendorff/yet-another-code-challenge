Duplicated Entries!
===================

In a former project we had a contact form.
In our production database we have found multiple entries of the same user.

Please describe shortly your approach in debugging this situation and name 2-3 different possible reasons for this kind of "bug".
For each option describe how we could fix this behaviour.

* Well, there is not enough context to say for sure and I can imagine less obvious situations with some tricky backend malfunctions,
  including some race conditions scenarios or something configured in really bad way.
  
  But let's focus here on something simple and obvious.
  
  Let's assume that you had just single email field which user could fill and send to your server.
  So if server creates multiple entries of the same user, it's because it doesn't check *properly* for user already exist in database. 
  So, the first possible reason - no check for dubs at all.
  
  The other reasons might be related to incorrectly implemented search of dubs. 
  For example case-sensitivity wasn't considered or string with email wasn't trimmed from leading and ending spaces. 
  
  That are the first things I would check I think. 
  Fixes are obvious here - trim spaces and lowercase values which you use as unique index keys in db, both before storing new data and when querying for it to check for dubs.
  Though if you have properly described index keys in db you will likely get an error on attempt to store duplicate. 
  So it's really necessary only to format data in the same way before store it in database.


