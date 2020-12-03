const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
  };
  return jwt.sign(payload, secret,{expiresIn: '1m'}); //set any expire time like 1s,1m,1h,1d, or 365d. or remove 'iat' and 'expiresIn' property.
};

/** 
 * check client side, does inAppStorage/sharedPref contains token. 
 * if(inAppStorage.contains(token)) {//store username and password aswell in InAppStorage.
 * response=await autoLogin();
 * if(response[data]=='please authemticate')  //mean token expire
 * again Login();  //to get new token, without showing login page. 
 * else
 * move to nextPage();
 * } else{
 * means user already logout show him loginPage.
 * }
 * that's it.
*/

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessToken = generateToken(user.id);

  return accessToken;
};


module.exports = {
  generateToken,
  generateAuthTokens,
};
