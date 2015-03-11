#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var program = require('commodore');
var FxaClient = require('fxa-js-client');


program
  .version('0.0.1')
  .option('-a, --auth <auth_server>', 'auth server to use. Defaults to https://stomlinson.dev.lcip.org/auth/v1', 'https://stomlinson.dev.lcip.org/auth/v1')
  .option('-e, --email <email>', 'email of account to lock')
  .demand('e')
  .option('-p, --pw <password>', 'password of account to lock')
  .demand('pw')
  .parse(process.argv);


var email = program.email;
var password = program.pw;
var authServer = program.auth;

console.log('(%s) locking %s with %s', authServer, email, password);

var fxaClient = new FxaClient(authServer);
fxaClient.accountLock(email, password)
  .then(function () {
    console.log('%s locked', email);
    process.exit(0);
  }, function (err) {
    console.error(String(err.message));
    process.exit(err.errno);
  });
