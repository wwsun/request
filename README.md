# Easy Request

## Usage

```js
import request, { createService, createServices } from 'axios-easy-request';

request.get('/foo');

request.post('/foo', { foo: 'foo' });

const get = createService({
  url: '/foo',
});

get({ foo: 'foo' });

const services = createServices({
  get: {
    url: '/foo',
  },
});

services.foo({
  foo: 'foo',
});
```
