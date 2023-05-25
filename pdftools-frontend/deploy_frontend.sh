#!/bin/bash
npm install
npm run build
cp -r build/index.html ../templates/index.html
cp -r build/static/** ../static