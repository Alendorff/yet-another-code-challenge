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
  
  First of all I would like to see these duplicates, if there are any differences?
  If no - I would suspect bad index configuration in DB which allows to save duplicated emails.
  If values are different because of spacing or case of letters - all we need to do is to trim and lowercase email before save into db.
