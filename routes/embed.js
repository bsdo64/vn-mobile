'use strict';

var express = require('express');
var videoParser = require('js-video-url-parser');
var metafetch = require('metafetch');

const Embeds = express.Router();

Embeds.get('/oembed', (req, res, next) => {
  let url = req.query.url;
  let data = videoParser.parse(decodeURIComponent(url));
  let html;
  
  switch (data.provider) {
    case 'youtube':
      html = '<div style="width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;">' +
        '<div id="' + data.id + '" class="youtube-embed ui embed" ' +
        'data-source="youtube" ' +
        'data-id="' + data.id + '" ' +
        'data-placeholder="http://i.ytimg.com/vi/' + data.id + '/mqdefault.jpg" ' +
        'style="-webkit-background-size: 100% 100%; -moz-background-size: 100% 100%; -o-background-size: 100% 100%; background-size: 100% 100%; ' +
        'background-image:url(http://i.ytimg.com/vi/' + data.id + '/mqdefault.jpg); top: 0; left: 0; width: 100%; height: 100%; position: absolute;" ' +
        '/>' +
        '</div>';
      break;

    case 'twitch':
      if (data.mediaType === 'stream') {
        html = '<div style="width: 100%; height: 0px; position: relative; padding-bottom: 60.9682%;">' +
          '<iframe src="http://player.twitch.tv/?channel=' + data.channel + '&autoplay=false" frameborder="0" allowfullscreen style="top: 0; left: 0; width: 100%; height: 100%; position: absolute;"></iframe>' +
          '</div>';
      }

      if (data.mediaType === 'video') {
        html = '<div style="width: 100%; height: 0px; position: relative; padding-bottom: 60.9682%;">' +
          '<iframe src="http://player.twitch.tv/?video=' + data.id + '&autoplay=false" frameborder="0" allowfullscreen style="top: 0; left: 0; width: 100%; height: 100%; position: absolute;"></iframe>' +
          '</div>';
      }
      break;

    case 'vimeo':
      html = '<div style="width: 100%; height: 0px; position: relative; padding-bottom: 80%;">' +
        '<iframe src="//player.vimeo.com/video/' + data.id + '?byline=0&badge=0&portrait=0&title=0" frameborder="0" allowfullscreen style="top: 0; left: 0; width: 100%; height: 100%; position: absolute;"></iframe>' +
        '</div>';
      break;

    default:
      break;
  }

  if (html) {
    res.json({html: html});
  } else {
    res.json({});
  }
});

Embeds.get('/urlMeta', (req, res, next) => {
  let url = req.query.url;

  delete req.headers.host;
  req.headers.accept = '*/*';

  metafetch.fetch(url, {
    flags: {
      images: false,
      links: false
    },
    http: {
      headers: req.headers,
      timeout: 30000
    },
  }, function (err, meta) {
    if (err) {
      console.error(err);
    }

    res.json(meta);
  });
});

module.exports = Embeds;
