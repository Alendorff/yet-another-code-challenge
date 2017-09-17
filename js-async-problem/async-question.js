'use strict';
/*
 * just an example library that you could use for testing purposes your task is to write
 * the implementation as described in the README.md
 */

function dbFakeUserRequest(id, callback){
  const user = { name: 'Somebody', roles: [1, 2]};
  const error = new Error('Id is not a finite number');
  const isValidRequest = isFinite(id);
  if(typeof callback === 'function') {
    return setImmediate(() => callback.apply(null, isValidRequest
                                ? [null, user]
                                : [error]));
  }
  return new Promise((resolve, request) => setImmediate(() => isValidRequest
    ? resolve(user)
    : reject(err)));
}

function dbFakeRoleRequest(id, callback){
  let role = {};
  let isValidRequest = true;
  const error = new Error('No such Role');
  switch(id){
  case 1: role.name = 'editor';
    break;
  case 2: role.name = 'master';
    break;
  default:
    isValidRequest = false;
  }
  if(typeof callback === 'function') {
    return setImmediate(() => callback.apply(null, isValidRequest
      ? [null, role]
      : [error]));
  }
  return new Promise((resolve, request) => setImmediate(() => isValidRequest
    ? resolve(role)
    : reject(err)));
}

module.exports = { dbFakeUserRequest, dbFakeRoleRequest }
