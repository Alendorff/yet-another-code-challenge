# Async Code #

Suppose you have an API with the following documentation:

All functions either take a node callback or return a Promise if no callback is supplied.

* `dbFakeUserRequest(id)` returns a user object with a name on the `name` property and an
array with role ids on the `roles` property.

* `dbFakeRoleRequest(id)` returns a role object with a name on the `name` property.

** Please write the code to get the user with the id `1` and output the role names. **

There is a file called `api.js` in this directory. You can use it as the api.
