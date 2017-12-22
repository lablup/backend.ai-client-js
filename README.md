# Backend.AI Client for Javascript (ES6+)

## Install

```console
$ npm install backend.ai-client
```

## Usage

TypeScript:
```typescript
import * as ai from 'backend.ai-client';

let config = ai.backend.ClientConfig.createFromEnv();
let client = new ai.backend.Client(config);
```

CommonJS-style:
```javascript
const ai = require('backend.ai-client');

let config = ai.backend.ClientConfig.createFromEnv();
let client = new ai.backend.Client(config);
```

When creating `ClientConfig` object, you can manually pass `accessKey`,
`secretKey`, and optional `endpoint` arguments.

All API functions return a promise that resolves into a JSON object
when success and rejects with a pair of error type and error message
if failed.

```javascript
client.create('python:latest', 'my-session-id')
.then(response => {
    console.log(`my session is created: ${response.kernelId}`);
}).catch((errorType, errorMsg) => {
    console.log(`session creation failed: ${errorMsg}`);
});
```

JSON objects returned with success contain different fields API by API.
Please check out [our official documentation](http://docs.backend.ai).

`errorType` is one of the following values:

* `ai.backend.Client.ERR_SERVER`: The server responded with failure.
  In this case, `errorMsg` includes HTTP status and additional error information
  returned by the API server.
* `ai.backend.Client.ERR_RESPONSE`: An error occurred while reading the response.
  `errorMsg` includes an exception value passed from your Javascript runtime.
* `ai.backend.Client.ERR_REQUEST`: An error occurred while sending the request.
  `errorMsg` includes an exception value passed from your Javascript runtime.
