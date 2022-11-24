'use strict'
const url = require('url')
const { postJSON } = require('./util')

/**
 * 小程序登录凭证校验
 * 详细细节 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 * Examples:
 * ```
 * api.code2Session('jd745fgdfg');
 * ```

 * @param {String} jsCode 小程序登录时获取的 code
 */
exports.code2Session = async function (jsCode) {
  // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  var urlObj = new url.URL(this.snsPrefix + 'jscode2session')
  var params = urlObj.searchParams
  params.append('appid', this.appid)
  params.append('secret', this.appsecret)
  params.append('js_code', jsCode)
  params.append('grant_type', 'authorization_code')

  return this.request(urlObj.href)
}

/**
 * 获取小程序 scheme 码
 * 详细细节 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/url-scheme/generateScheme.html
 * Examples:
 * ```
 * api.generatescheme({
 *   jump_wxa:{
 *     path: 'pages/index/index
 *   }
 * });
 * ```
 * @param {String} data 小程序跳转参数
 */
exports.generateScheme = async function (data) {
  // https://api.weixin.qq.com/wxa/generatescheme?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken()
  var url = this.wxaPrefix + 'generatescheme?access_token=' + accessToken
  return this.request(url, postJSON(data))
}

/**
 * 获取用户授权的手机号
 * 详细细节 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html
 * Examples:
 * ```
 * {
 *     "errcode":0,
 *     "errmsg":"ok",
 *     "phone_info": {
 *         "phoneNumber":"xxxxxx",
 *         "purePhoneNumber": "xxxxxx",
 *         "countryCode": 86,
 *         "watermark": {
 *             "timestamp": 1637744274,
 *             "appid": "xxxx"
 *         }
 *     }
 * }
 * ```
 * @param {String} code 小程序授权手机号的code
 */
exports.getPhoneNumber = async function (code) {
  // https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN
  const { accessToken } = await this.ensureAccessToken()
  var url = this.wxaPrefix + 'business/getuserphonenumber?access_token=' + accessToken
  var data = {
    code: code
  };
  return this.request(url, postJSON(data))
}
