const router = require('koa-router')()

// 引入svg-captcha
const svgCaptcha = require("svg-captcha");
const User = require('./list')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  // 生成验证码
  const captcha = svgCaptcha.create({
    size: 3, // 字符数
    // ignoreChars: "zxcvbnmasdfghjklqwertyuiop", // 过滤字符
    noise: 3, // 干扰线条数
    color: true,
    background: "#fff", // 背景颜色
  });

  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")
  console.log('验证码：', captcha.text)

  // captcha 是个对象，text是验证码文字，data是验证码
  ctx.body = {
    code: 200,
    msg: '获取验证码成功！',
    data: captcha
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/login', async (ctx, next) => {
  let data = { ...ctx.request.body }
  console.log('登录参数：', data)

  //设置允许跨域
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "OPTIONS,GET,PUT,POST,DELLETE")

  let state = false
  let rest = { code: 200, msg: '登录成功！' }

  for (let index = 0; index < User.list.length; index++) {
    const item = User.list[index];

    if (item.username == data['username'] && item.pwd == data['pwd']) {
      state = true
      break;
    }
  }
  if (!state) {
    rest = {
      code: 400,
      msg: '登录失败！',
      data: '用户名或密码错误！'
    }
  }

  ctx.body = rest
})

module.exports = router
