# Backend.AI Client for Javascript

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
in both success and failures.

Success JSON objects contains different fields API by API.
Please check out [our official documentation](http://docs.backend.ai).

Failure JSON objects contains a `title` attribute and other fields
describing the error information.
