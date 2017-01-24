const express = require('express');
const router = express.Router();
const Api = require('superagent');

const routes = [
  '/',
  '/all',
  '/collection/:collectionId',
  '/community',
  '/community/submit',
  '/community/submit/category',
  '/community/submit/forum',
  '/community/settings',
  '/community/settings/foruminfo',
  '/community/settings/forumurl',
  '/community/settings/announce',
  '/community/settings/writepost',
  '/community/settings/writecomment',
  '/community/settings/share',
  '/community/settings/promotion',
  '/community/settings/managers',
  '/community/settings/banlist',
  '/community/settings/spams',
  '/community/settings/spamreports',
  '/community/settings/stat/forum',
  '/community/settings/stat/views',
  '/community/settings/stat/visitors',
  '/community/settings/stat/likerank',
  '/community/settings/stat/commentrank',
  '/community/settings/stat/viewrank',
  '/activity',
  '/activity/likes',
  '/activity/posts',
  '/activity/comments',
  '/setting',
  '/setting/password',
  '/setting/profile',
  '/search',
  '/signin',
  '/policies',
  '/policies/privacy',
  '/policies/terms',
  '/about',
  '/careers',
  '/advertisement',
  '/member/find',
  '/link/post',
  '/link/post/m',
  '/user/chargePoint',
  '/user/points',
  '/user/points/chargeLog',
  '/user/venalinks',
  '/user/venalinks/active',
  '/user/venalinks/share',
  '/point/noti',
  '/help',
  '/help/guide'
];

const redirectRoutes = [
  '/collection'
];

const redirectTo = {
  '/collection': '/'
};

router.get(redirectRoutes, function (req, res, next) {
  console.log(req.headers);
  console.log(req.path);

  let redirect = redirectTo[req.path];
  if (redirect) {
    res.redirect(redirect);
  } else {
    res.redirect('/');
  }

  next();
});

router.get('/venalink/post/m/:linkId', function (req, res) {
  // 메타 제공 시스템

  Api
    .get('http://127.0.0.1:3001/ajax/venalink/post/m/' + req.params.linkId)
    .set(req.headers)
    .end(function (err, result) {

      if (err || !result.ok) {
        res.render('entry/meta', null);
      } else {
        res.render('entry/meta', result.body);
      }
    });
});

router.get('/venalink/post/:linkId', function (req, res) {
  // 실질적인 방문자 추적 시스템

  if (req.params.linkId) {
    Api
      .get('http://127.0.0.1:3001/ajax/venalink/post/' + req.params.linkId)
      .set(req.headers)
      .end(function (err, result) {
        const post = result.body;

        if (post) {
          res.redirect(`/community?forumId=${post.forum_id}&postId=${post.id}`);
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/');
  }
});

router.get('/link/post/m/:linkId', function (req, res) {
  // 메타 제공 시스템

  Api
    .get('http://127.0.0.1:3001/ajax/link/post/m/' + req.params.linkId)
    .set(req.headers)
    .end(function (err, result) {

      if (err || !result.ok) {
        res.render('entry/meta', null);
      } else {
        res.render('entry/meta', result.body);
      }
    });
});

router.get('/link/post/:linkId', function (req, res, next) {
  // 실질적인 방문자 추적 시스템

  if (req.params.linkId) {
    Api
      .get('http://127.0.0.1:3001/ajax/link/post/' + req.params.linkId)
      .set(req.headers)
      .end(function (err, result) {
        const post = result.body;

        if (post) {
          res.redirect(`/community?forumId=${post.forum_id}&postId=${post.id}`);
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/');
  }
});

/* GET home page. */
router.get(routes, function (req, res, next) {

  let defaultData = {
    production: !!process.env.NODE_ENV,

    title: '베나클',
    meta: [
      { name: 'description', content: '공유하세요! 원하는 모든 정보와 이슈가 있는곳, 베니클입니다.' },
      { name: 'og:title', content: '베나클' },
      { name: 'og:description', content: '공유하세요! 원하는 모든 정보와 이슈가 있는곳, 베니클입니다.' },
      { name: 'og:image', content: '' },
      { name: 'og:url', content: '' },
      { name: 'og:site_name', content: '베나클' },
    ]
  };

  if (req.query.postId) {
    Api
      .get('http://127.0.0.1:3001/ajax/post/meta/' + req.query.postId)
      .set(req.headers)
      .end((err, result) => {
        defaultData = result.body;

        res.render('entry/index', defaultData);
      })
  } else {
    res.render('entry/index', defaultData);
  }
});

/* 404 page. */
router.get('*', function (req, res, next) {

  res.redirect('/');
});

module.exports = router;
