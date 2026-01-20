// Debug helper: monkey-patch Express to log route paths before server startup
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";
const express = require('express');

function wrap(fnName, obj) {
  const orig = obj[fnName];
  obj[fnName] = function(...args) {
    try {
      const first = args[0];
      if (typeof first === 'string') {
        console.log(`${fnName} called with path:`, first);
        if (first.includes('https://') || first.includes('http://') || first.startsWith(':')) {
          console.warn('Suspicious path detected ->', first);
        }
      }
    } catch (e) {
      // ignore
    }
    return orig.apply(this, args);
  };
}

wrap('use', express.application);
const Router = require('express').Router;
wrap('get', Router.prototype);
wrap('post', Router.prototype);
wrap('put', Router.prototype);
wrap('delete', Router.prototype);
wrap('patch', Router.prototype);

console.log('Starting server with debug wrappers...');
require('./server');
