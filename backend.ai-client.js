'use babel';
/*
Backend.AI Cloud Javascript API Library (v2.9)
==============================================

(C) Copyright 2016-2018 Lablup Inc.
Licensed under MIT
*/
/*jshint esnext: true */

if (typeof fetch === 'undefined') {
  var fetch = require('node-fetch');
  var Headers = fetch.Headers;
}
var crypto = require('crypto');

class BackendAIConfig {
  constructor(accessKey, secretKey, endpoint) {
    // fixed configs with this implementation
    this._apiVersionMajor = 'v2';
    this._apiVersion = 'v2.20170315';
    this._hashType = 'sha256';
    // dynamic configs
    if (typeof accessKey == 'undefined' || accessKey == null)
      throw 'You must set accessKey.';
    if (typeof secretKey == 'undefined' || secretKey == null)
      throw 'You must set accessKey.';
    if (typeof endpoint == 'undefined' || endpoint == null)
      endpoint = 'https://api.backend.ai';
    this._endpoint = endpoint;
    this._accessKey = accessKey;
    this._secretKey = secretKey;
  }

  get accessKey() {
    return this._accessKey;
  }

  get secretKey() {
    return this._secretKey;
  }

  get endpoint() {
    return this._endpoint;
  }

  get apiVersion() {
    return this._apiVersion;
  }

  get apiVersionMajor {
    return this._apiVersionMajor;
  }

  get hashType {
    return this._hashType;
  }

  static createFromEnv() {
    return BackendAIConfig(
      process.env.BACKEND_ACCESS_KEY,
      process.env.BACKEND_SECRET_KEY,
      process.env.BACKEND_ENDPOINT
    );
  }
}

class BackendAIClient {
  constructor(config) {
    this.code = null;
    this.signKey = null;
    this.kernelId = null;
    this.kernelType = null;
    this.clientVersion = '0.1.5';  // TODO: read from package.json?
    if (typeof config == 'undefined') {
      this._config = BackendAIConfig.createFromEnv();
    } else {
      this._config = config;
    }
  }

  getAPIversion() {
    let rqst = this.newUnsignedRequest('GET', '/', null);
    return fetch(rqst.uri, rqst)
    .then( function(response) {
      if (response.version) {
        console.log(`API version: ${response.version}`);
        return response.version;
      }
      return true;
    });
  }

  createKernel(kernelType, clientSessionToken) {
    if (typeof clientSessionToken == 'undefined')
      clientSessionToken = "backend-ai-live-code-runner";
    let requestBody = {
      "lang": kernelType,
      "clientSessionToken": clientSessionToken,
      "resourceLimits": {
        "maxMem": 0,
        "timeout": 0
      }
    };
    let rqst = this.newSignedRequest('POST', '/kernel/create', requestBody);
    return fetch(rqst.uri, rqst);
  }

  destroyKernel(kernelId) {
    let rqst = this.newSignedRequest('DELETE', `/kernel/${kernelId}`, null);
    return fetch(rqst.uri, rqst);
  }

  restartKernel(kernelId) {
    let rqst = this.newSignedRequest('PATCH', `/kernel/${kernelId}`, null);
    return fetch(rqst.uri, rqst);
  }

  // TODO: interrupt

  // TODO: auto-complete

  execute(kernelId, runId, mode, code, opts) {
    let requestBody = {
      "mode": mode,
      "code": code,
      "runId": runId,
      "opts": opts,
    };
    let rqst = this.newSignedRequest('POST', `/kernel/${kernelId}`, requestBody);
    return fetch(rqst.uri, rqst);
  }

  runCode(code, kernelId, runId, mode) {
    // legacy alias
    return this.execute(kernelId, runId, mode, code, {});
  }

  newSignedRequest(method, queryString, body) {
    let requestBody;
    let d = new Date();
    this.signKey = this.getSignKey(this.secretKey, d);
    if (body === null) {
      requestBody = '';
    } else {
      requestBody = JSON.stringify(body);
    }
    queryString = '/' + this._config.apiVersionMajor + queryString;
    let aStr = this.getAuthenticationString(method, queryString, d.toISOString(), requestBody);
    let sig = this.sign(this.signKey, 'binary', aStr, 'hex');

    let hdrs = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(requestBody),
      "User-Agent": "Backend.AI Client for Javascript " + this.clientVersion,
      'X-BackendAI-Version': this._config.apiVersion,
      "X-BackendAI-Date": d.toISOString(),
      "Authorization": `Sorna signMethod=HMAC-SHA256, credential=${this.accessKey}:${sig}`
    });

    let requestInfo = {
      method: method,
      headers: hdrs,
      cache: 'default',
      body: requestBody,
      uri: this._config.endpoint + queryString,
    };
    return requestInfo;
  }

  newUnsignedRequest(method, queryString, body) {
    let d = new Date();
    let hdrs = new Headers({
      "Content-Type": "application/json",
      "User-Agent": "Backend.AI Client for Javascript " + this.clientVersion,
      'X-BackendAI-Version': this._config.apiVersion,
      "X-BackendAI-Date": d.toISOString()
    });
    queryString = '/' + this._config.apiVersionMajor + queryString;
    let requestInfo = {
      method: method,
      headers: hdrs,
      mode: 'cors',
      cache: 'default',
      uri: this._config.endpoint + queryString,
    };
    return requestInfo;
  }

  getAuthenticationString(method, queryString, dateValue, bodyValue) {
    return (method + '\n' + queryString + '\n' + dateValue + '\n'
            + 'host:' + this._config.endpoint + '\n'
            + 'content-type:application/json' + '\n'
            + 'x-backendai-version:'+this._config.apiVersion + '\n'
            + crypto.createHash(this._config.hashType).update(bodyValue).digest('hex'));
  }

  getCurrentDate(now) {
    let year = (`0000${now.getUTCFullYear()}`).slice(-4);
    let month = (`0${now.getUTCMonth() + 1}`).slice(-2);
    let day = (`0${now.getUTCDate()}`).slice(-2);
    let t = year + month + day;
    return t;
  }

  sign(key, key_encoding, msg, digest_type) {
    let kbuf = new Buffer(key, key_encoding);
    let hmac = crypto.createHmac(this.hash_type, kbuf);
    hmac.update(msg, 'utf8');
    return hmac.digest(digest_type);
  }

  getSignKey(secret_key, now) {
    let k1 = this.sign(secret_key, 'utf8', this.getCurrentDate(now), 'binary');
    let k2 = this.sign(k1, 'binary', this.endpoint, 'binary');
    return k2;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports.BackendAIClient = BackendAIClient;
  module.exports.BackendAIConfig = BackendAIConfig;
}
