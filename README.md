# Backend.AI Client for Javascript (node.js / ES6+)

## Requirements

This client SDK runs on CommonJs (with node.js) / ES6-compatible Javascript runtimes with async/await supports
such as NodeJS 7+ and modern web browsers released since 2017.

This client library supports Backend.AI API v3/4/5.

## Install

```console
$ npm install backend.ai-client
```
You can also use `yarn`.

```console
$ yarn install backend.ai-client
```

## Build

### Package preparation

NPM: 
```console
$ npm i
```

Yarn:
```console
$ yarn install
```

### ES6+ library

```console
$ make es6
```

### Node.js library

```console
$ make node 
```

## Usage

TypeScript:
```typescript
import * as ai from 'backend.ai-client-node';

let config = ai.backend.ClientConfig.createFromEnv();
let client = new ai.backend.Client(config);
```

CommonJS-style:
```javascript
const ai = require('backend.ai-client-node');

let config = ai.backend.ClientConfig.createFromEnv();
let client = new ai.backend.Client(config);
```

ES6+:
```
import './backend.ai-client-es6.js';

let config = new ai.backend.ClientConfig(
  '[ADD_ACCESS_KEY_HERE]',
  '[ADD_SECRET_KEY_HERE]',
  '[ENDPOINT_HERE]'
);
let client = new ai.backend.Client(
  config,
  `Backend.AI ES6 App.`,
);
```

When creating `ClientConfig` object, you can manually pass `accessKey`,
`secretKey`, and optional `endpoint` arguments.
The environment variables are:
* `BACKEND_ACCESS_KEY`
* `BACKEND_SECRET_KEY`
* `BACKEND_ENDPOINT` (optional, defaults to `https://api.backend.ai`)

All API functions return a promise that resolves into a parsed object
when success according to server-provided `Content-Type` and rejects with an
object with `type` and `message` attributes if failed.

```javascript
client.createIfNotExists('python:latest', 'my-session-id')
.then(response => {
  console.log(`my session is created: ${response.kernelId}`);
}).catch(err => {
  switch (err.type) {
  case ai.backend.Client.ERR_SERVER:
    console.log(`session creation failed: ${err.message}`);
    break;
  default:
    console.log(`request/response failed: ${err.message}`);
  }
});
```

The result objects returned with success has different formats API by API.
Please check out [our official documentation](https://docs.backend.ai/).

When using backend.ai, you can use with `SESSION` mode or `API` mode.  
If you want to use backend.ai with `SESSION` mode you need to input `user_id`, `password`, `api_endpoint` and `SESSION` to specify the mode.  
If you want to use backend.ai with `API` mode you need to input `ACCESS_KEY` and `SECRET_KEY` instead of `user_id` and `password`. Also you don't need to input the mode because `API` mode is default value.

```javascript
async Login() {
  config = new ai.backend.ClientConfig(
    '[ADD_USER_ID_HERE]',
    '[ADD_PASSWORD_HERE]',
    '[ENDPOINT_HERE]',
    '[CONNECTION_MODE_HERE]'
  );
  client = new ai.backend.Client(
    config,
    `Backend.AI Console.`,
  );
  let isLogon = await client.check_login();
  if (isLogon === false) {
    client.login().then(reponse => {
      if (reponse === false) {
        if (user_id != '' && password != '') {
          console.log(`Login information mismatch. Please check your login information.`);
        }
      } else if (reponse.fail_reason) {
        if (user_id != '' && password != '') {
          console.log(`Login failed: ${response.fail_reason}`);
        }
      } else {
        console.log(`Login succeeded.`);
      }
    }).catch(err => {
        console.log(`Login failed: ${err.message}`);
    });
  } else {
    console.log(`Login already succeeded.`)
  }
}
```

`err.type` is one of the following values:

* `ai.backend.Client.ERR_SERVER`: The server responded with failure.
  In this case, `err.message` includes HTTP status and additional error information
  returned by the API server.
* `ai.backend.Client.ERR_RESPONSE`: An error occurred while reading the response.
  `err.message` includes an exception value passed from your Javascript runtime.
* `ai.backend.Client.ERR_REQUEST`: An error occurred while sending the request.
  `err.message` includes an exception value passed from your Javascript runtime.
* `ai.backend.Client.ERR_ABORT`: An error occurred while request aborted by user.
* `ai.backend.Client.ERR_TIMEOUT`: An error occurred while no response returned during the timeout period.
* `ai.backend.Client.ERR_UNKNOWN`: An error occurred while unknown error occurs.
  In this case, `err.message` includes HTTP status and additional error information
  returned by the API server.