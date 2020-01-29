'use strict';

const request = require('request');
const token = '';

function githubGet(url) {
  return new Promise((resolve, reject) => {
    request.get(url, {
      'headers': { 'User-Agent': 'request' },
      'auth': { 'bearer': token }
      }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        resolve(JSON.parse(body));
      });
  });
}

githubGet('https://api.github.com/notifications?participating=true').then(notifications => {
  for (const note of notifications) {
    githubGet(note.subject.latest_comment_url).then(comment => {
    });
  }
});
