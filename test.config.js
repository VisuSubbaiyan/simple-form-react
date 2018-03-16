require('babel-register');

const Module = require('module');
const path = require('path');
const originalFindpath = Module._findPath;
const originalLoad = Module._load;

Module._load = (request, parent, isMain) => {
  if (request.includes('!')) return false;

  return originalLoad(request, parent, isMain);
};

Module._findPath = (request, paths) => {
  const srcPaths = ['components', 'helpers', 'routes'];
  var newRequest = request;

  srcPaths.some(p => {
    const match = request === p || request.indexOf(p) === 0;

    if (match) {
      newRequest = path.join(__dirname, '..', 'src', request);
    }

    return match;
  });

  return originalFindpath(newRequest, paths);
}

const jsdom = require('jsdom');

// setup document
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the document
const win = doc.defaultView;
const noop = () => false;
win.matchMedia = noop;

// set global for mocha that make access to document and window
global.document = doc;
global.window = win;
global.navigator = win.navigator;
global.sinon = require('sinon');