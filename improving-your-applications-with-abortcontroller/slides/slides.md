---
layout: cover
background: >-
  /cover-photo.jpg
title: Improving your applications with AbortController ✨
---

# Improving your applications with AbortController ✨

<div class="uppercase text-sm tracking-widest">
Simon Plenderleith
</div>

<div class="abs-bl mx-14 my-12 flex">
  <img src="/logo-nodeconfremote-2021.png" class="h-10">
  <div class="flex flex-col text-left ml-6">
    <div><b>NodeConf Remote 2021</b></div>
    <div class="text-sm opacity-50">Oct. 19th, 2021</div>
  </div>
</div>

---
layout: center
class: text-5xl text-center
---

Slides and `code` at

<div class="pt-6">

[simonplend.com/nodeconf2021](https://simonplend.com/nodeconf2021)

</div>

---
layout: intro
---

# Hi, I'm Simon 👋🏻

<div class="text-xl opacity-80">

<v-clicks>

Independent **Node.js consultant and educator**

**I help developers level up** with Node.js at [simonplend.com/blog](https://simonplend.com/blog)

</v-clicks>

<div class="block mt-6" v-click>

<img src="https://expressapivalidation.com/images/cover.png" class="float-left h-30 mr-4">

Author of **Express API Validation Essentials**<br>
[expressapivalidation.com](https://expressapivalidation.com)

</div>

</div>

<div v-click class="mt-30 my-10 grid grid-cols-[35px,1fr] w-min gap-y-4">
  <ri-twitter-line class="opacity-80 text-blue-400"/>
  <div><a href="https://twitter.com/simonplend" target="_blank">@simonplend</a></div>
  <ri-github-line class="opacity-60"/>
  <div><a href="https://github.com/simonplend" target="_blank">simonplend</a></div>
  <ri-user-3-line class="opacity-80 text-yellow-500"/>
  <div><a href="https://simonplend.com" target="_blank">simonplend.com</a></div>
</div>

<img src="/me.jpg" class="rounded-full w-40 abs-tr mt-16 mr-12"/>

<!--
- I help companies and development teams use Node.js to ship great products that grow their businesses.
- It introduces a complete API validation strategy that you can start applying in your Express applications today.
-->

---
layout: image-left
image: '/photo-person-holding-ice-cream.jpg'
class: text-2xl
---

# What's on the menu?

<div>

<v-clicks>

🍦 Problems at Ice Cream Corp

🍦 Performance testing

🍦 Menu Service v2... ?

🍦 The Abort API

🍦 Menu Service v3

🍦 Abort API support in Node.js

</v-clicks>

<div class="mt-40 text-xs italic opacity-30">

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/photos/wxmrTxUAMJE)

</div>

</div>

---
layout: cover
background: '/photo-ice-cream-on-ground.jpg'
class:  text-shadow-lg
---

# Problems at Ice Cream Corp 🍨

<div class="mt-20 text-xs italic opacity-30">

Photo by [Pawel Janiak](https://unsplash.com/@pawelj) on [Unsplash](https://unsplash.com/photos/WtRuYJ2EPMA)

</div>

---
layout: center
---

# Ice Cream Corp Architecture

<div>

<img src="/icecreamcorp-architecture-diagram.png" class="h-100" alt="Ice Cream Corp Architecture Diagram" />

</div>

<!--
- Service-to-service HTTP requests
- This is a common pattern in service based architectures
- Many of the clients I've worked with have systems with an architecture like this
-->

---
layout: center
---

# The Unpredictable Stock Service

<div>

<img src="/icecreamcorp-backend-diagram.png" class="h-100" alt="Ice Cream Corp Architecture Diagram" />

</div>

<!--
- Business critical API
- Sadly it's a bit unloved and unmaintained
- SQL queries it runs execute very slowly on database server
- Response times become very unpredictable
- Ice Cream Corp want us to help the team which runs Menu Service
-->

---
source_code: icecreamcorp/stock-service/server.js
---

# The Unpredictable Stock Service: Code

```javascript {1-3|5|6-10|12,14,16|15|all}
import Fastify from "fastify";

const app = Fastify();

app.get("/stock", function (request, reply) {
	const stock = [
		{ id: "cf93d53f-7f60-4c9d-a543-ef217a09269b", name: "Cookies 'n' Cream", stock: 8532 },
		{ id: "41373bb6-e6fb-4606-8f01-1cd24e228939", name: "Neopolitan", stock: 0 },
		{ id: "8e884a8d-ae04-4518-80b7-377ee5bcecc6", name: "Pistachio", stock: 6437 }
	];

	const delay = Math.floor(Math.random() * 10000);

	setTimeout(() => {
		reply.send({ stock, delay });
	}, delay);
});

await app.listen(4000);
```

<!--
- We take a look at the code for the Stock Service
- They're using Fastify to create an HTTP server
- That server exposes a single / endpoint
- The route handler for the / endpoint simulates a slow database query execution
by delaying the response by a random amount
-->

---
source_code: icecreamcorp/menu-service-v1/server.js
---

# Menu Service v1: Code

```javascript {4-10|14|15-17|19|all}
import fetch from "node-fetch";
import Fastify from "fastify";

async function makeRequest(url) {
	const response = await fetch(url);

	const responseData = await response.json();

	return responseData;
}

const app = Fastify();

app.get("/menu", async function (request, reply) {
	const stockServiceEndpoint = "http://stock-service.icecreamcorp.net:4000/stock";

	const stockServiceResponse = await makeRequest(stockServiceEndpoint);

	reply.send({ stockServiceResponse });
});

await app.listen(3000);
```

<!--
- DO: VS code make a cURL request
-->

---
layout: section
---

# ⏱️ Performance testing

---

# Load testing and profiling the Menu Service

<div class="flex mt-10">

<v-click at="1">

<div class="flex-col bg-white p-5">

<v-click at="2">

<a href="https://www.npmjs.com/package/autocannon"><img src="/logo-autocannon.png" class="h-20 pb-5 bg-white" alt="AutoCannon logo" /></a>

</v-click>

<v-click at="4">

<a href="https://www.npmjs.com/package/clinic"><img src="/logo-clinic-js.png" class="h-20" alt="Clinic.js logo" /></a>

</v-click>

</div>

</v-click>

<v-click at="3">

<div class="flex pl-10">

<img src="/autocannon-recording.gif" class="h-80 shadow-yellow-500" alt="Recording of AutoCannon running against the Menu Service" />

</div>

</v-click>

</div>

<!--
- Want to help the developers at Ice Cream Corp understand the behaviour of Menu Service
- Simulate production traffic
- What does good look like for load test and profiling results?
- Very variable, but can use these tools to establish the baseline
- Improve things from there
-->

---

# Menu Service v1: Behaviour

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬────────────┬──────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg *      │ Stdev      │ Max      │
├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼────────────┼──────────┤
│ Latency │ 244 ms │ 4862 ms │ 9718 ms │ 9900 ms │ 4898.42 ms │ 2941.22 ms │ 10000 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴────────────┴────────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg *   │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 6       │ 8       │ 19      │ 27      │ 19.15   │ 4.63    │ 6       │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

1k requests in 60.03s, 539 kB read
3 errors (3 timeouts)
```

<!--
- Very unpredictable service
- Because of Stock Service behaviour
- Lots of people getting > 5s response time
-->

---

# Menu Service v1: Behaviour

<div>

![Menu Service v1 Clinic.js Results](/clinic-menu-service-v1.png)

</div>

---
layout: center
---

# How can we improve the Menu Service?

<twemoji-thinking-face class="text-10xl mt-10" />

---
layout: section
---

# Menu Service v2... ?

<!--
- Ice Cream Corp developers have already tried improving it
- Let's look at the changes they made
- DO: VS Code look at v2 code
- DO: Run service, make requests with fish script
-->

---

# Menu Service v2: Behaviour

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg *     │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 253 ms │ 1004 ms │ 1024 ms │ 1146 ms │ 957.63 ms │ 176.57 ms │ 1217 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────────┬───────┬───────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%  │ 50%   │ 97.5%   │ Avg *   │ Stdev  │ Min     │
├───────────┼─────────┼───────┼───────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 13      │ 100   │ 105   │ 112     │ 103.47  │ 12.1   │ 13      │
└───────────┴─────────┴───────┴───────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

612 2xx responses, 5596 non 2xx responses
6k requests in 60.03s, 1.97 MB read
```

<!--
- Things LOOK better from these results
-->

---

# Menu Service v2: Behaviour

<div>

![Menu Service v2 Clinic.js Results](/clinic-menu-service-v2.png)

</div>

<!--
- The error message we have here is actually a lie!
- Not actually cancelling the HTTP request
- DO: Add `console.log` of `responseData`
- I've seen this pattern implemented in real Node.js services
- It's an anti-pattern and you shouldn't write code like this
-->

---
layout: fact
---

# What now?!

<!--
- We're going to introduce the developers at Ice Cream Corp to something which can help
-->

---
layout: section
---

# The Abort API

---

# The Abort API

<v-clicks>

A JavaScript API which consists of two classes:

`AbortController` and `AbortSignal`

<img src="/abort-api-diagram.png" class="h-80 mx-auto" alt="The Abort API Diagram" />

</v-clicks>

<!--
- JavaScript API designed to help us abort asynchronous operations
-->

---
layout: center
source_code: examples/introducing-the-abort-api.js
---

# The Abort API in action

```javascript {1|2|4-6|8|all}
const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener("abort", () => {
	console.log("The abort signal was triggered");
}, { once: true });

controller.abort();
```

<!--
- `controller.abort()`
	- Sets signal's `aborted` property to `true`
	- Dispatches `abort` event from `AbortSignal` instance to list of registered handlers.
- We've registered one handler for the `abort` event type,
which logs a message to let us know that the abort signal was triggered.
- If you're using a library or method which accepts an `AbortSignal` instance
as an option, it will attach it's own event handler for the `abort` event.
-->

---

# Support for the Abort API

<v-clicks>

The Abort API originated in the [Web Platform](https://github.com/whatwg/fetch/issues/27)

Microsoft Edge 16 was the first browser to implement the Abort API in October 2017.

Now all major browsers [support it](https://caniuse.com/abortcontroller).

<div class="block">

<a href="https://caniuse.com/abortcontroller"><img src="/caniuse-screenshot-abortcontroller.png" class="h-px259" alt="caniuse.com screenshot" /></a>

<div class="text-xs italic opacity-30 float-right">

Source: [caniuse.com](https://caniuse.com/abortcontroller)

</div>

</div>

Stable **support in Node.js since [v15.4.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V15.md#15.4.0)**, released in December 2020.

</v-clicks>

<!--
- We'll dive into which versions of Node.js support the Abort API a little later
-->

---
layout: image-right
image: /background-abstract.jpg
---

# What benefits can we get from cancelling async operations?

<v-clicks>

- Greater control over the behaviour of our application
- Free up system or network resources the application is using
- Ability to "fail fast"
- Potential improvement to application performance

</v-clicks>

<div class="mt-24 text-xs italic opacity-30">

Photo by [David Becker](https://unsplash.com/@beckerworks) on [Unsplash](https://unsplash.com/photos/crs2vlkSe98)

</div>

---
source: examples/node-fetch-with-abortsignal.js
---

# Cancelling an HTTP request with an `AbortSignal`

```javascript {3|5-7|8-10|12|all}
import fetch from "node-fetch";

const cancelRequest = new AbortController();

fetch("https://jsonplaceholder.typicode.com/posts", {
	signal: cancelRequest.signal
})
	.then(response => response.json())
	.then(responseData => console.log(responseData))
	.catch(error => console.error(error));

cancelRequest.abort();
```

<!--
- `fetch` adding event listener for `abort` event on `AbortSignal`
- Not awaiting the promise
- Want to cancel the request before the promise is fulfilled
-->

---

```
$ node node-fetch-with-abortsignal.js

file:///dev/node_modules/node-fetch/src/index.js:56
			const error = new AbortError('The operation was aborted.');
			              ^

AbortError: The operation was aborted.
    at abort (file:///dev/node_modules/node-fetch/src/index.js:56:18)
    at EventTarget.abortAndFinalize (file:///dev/node_modules/node-fetch/src/index.js:75:4)
    at EventTarget.[nodejs.internal.kHybridDispatch] (node:internal/event_target:562:20)
    at EventTarget.dispatchEvent (node:internal/event_target:504:26)
    at abortSignal (node:internal/abort_controller:97:10)
    at AbortController.abort (node:internal/abort_controller:122:5)
    at file:///dev/abort-api/node-fetch-with-abortsignal.js:12:16
    at ModuleJob.run (node:internal/modules/esm/module_job:183:25)
    at async Loader.import (node:internal/modules/esm/loader:178:24)
    at async Object.loadESM (node:internal/process/esm_loader:68:5) {
  type: 'aborted'
}
```

---
layout: section
---

# Menu Service v3

<!--
- DO: Look at service v3 code
- DO: Run service, make requests with fish script
-->

---

# Menu Service v3: Behaviour

```
Running 60s test @ http://menu-service.icecreamcorp.net:3000/menu
100 connections

┌─────────┬────────┬─────────┬─────────┬─────────┬──────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg *    │ Stdev     │ Max     │
├─────────┼────────┼─────────┼─────────┼─────────┼──────────┼───────────┼─────────┤
│ Latency │ 282 ms │ 1006 ms │ 1116 ms │ 1167 ms │ 967.9 ms │ 172.98 ms │ 1251 ms │
└─────────┴────────┴─────────┴─────────┴─────────┴──────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg *   │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 4       │ 78      │ 104     │ 111     │ 102.57  │ 13.55   │ 4       │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

614 2xx responses, 5540 non 2xx responses
6k requests in 60.03s, 1.94 MB read
```

<!--
- Improved predictability of service behaviour
-->

---

# Menu Service v3: Behaviour

<div>

![Menu Service v3 Clinic.js Results](/clinic-menu-service-v3.png)

</div>

<!--
- Improved performance of the service
-->

---
class: text-3xl
---

# ⏭️ Next steps

<v-clicks>

- Capture metrics of how many requests we're aborting
- Back off making requests to the Stock Service
- Prioritise improving the Stock Service

</v-clicks>

<!--
- The changes we've made have improved things
- But most of the time the requests fail early
- So there's more work to do to fix Ice Cream Corp's problems
- But that's something for another talk!
-->

---
layout: section
---

# Abort API support<br>in Node.js <img src="/logo-node-icon.png" class="h-20 mt-5 mx-auto">

---

# <img src="/logo-node-icon.png" class="h-10 float-left mr-3"> Compatibility in Node.js versions

<v-click at="1">

| | <strong>v16.x</strong> | <strong>>= v14.17.0</strong>  | <strong>Older versions</strong> |
| --- |:---:|:---:|:---:|
| `AbortController` +<br>`AbortSignal` classes | ✅ | Experimental | Use [abort-controller](https://www.npmjs.com/package/abort-controller)<br>package |
| Node.js core APIs which<br>accept `AbortSignal` | ✅ | ✅ | ❌ |

</v-click>

<v-click at="2">

## Node.js >= v14.17.0

</v-click>

<v-click at="3">

Enable abort classes with flag e.g. `node --experimental-abortcontroller server.js`

</v-click>

<v-click at="4">

OR `npm install abort-controller` and:

```javascript
import AbortController from "abort-controller";
```

</v-click>

<!--
- Support for `AbortConroller` and `AbortSignal` classes has been Stable since v15.4.0
- A number of Node.js core API methods now accept an `AbortSignal` instance as an option
- We'll look at the core API methods in a moment
- v16 release line enters Active Long Term Support on 26th October 2021
- Makes it suitable for use in production
- Support is Experimental from v14.17.0 onwards
- Node.js core implementation closely modelled on the `abort-controller` implementation
-->

---
layout: two-cols
---

# <img src="/logo-node-icon.png" class="h-10 float-left mr-3"> Support for `AbortSignal` in Node.js core API methods

<v-click>

### child_process

- `child_process.exec`
- `child_process.execFile`
- `child_process.fork`
- `child_process.spawn`

### dgram

- `dgram.createSocket`

### events

- `events.on`
- `events.once`

</v-click>

::right::

<v-click>

### fs

- `fs.readFile`
- `fs.watch`
- `fs.writeFile`

### http

- `http.request`
- `https.request`

### http2session

- `http2Session.request`

### timers/promises

- `timers/promises.setImmediate`
- `timers/promises.setTimeout`

### readline

- `readline.Interface`
- `readline.createInterface`

</v-click>

---
class: text-2xl
---

# 📦 Libraries with support for `AbortSignal`

<v-clicks>

## HTTP libraries

- [Node Fetch](https://npm.im/node-fetch)
- [Undici](https://undici.nodejs.org/)
- [Axios](https://npm.im/axios) - v0.22.0 (released on Oct 1st 2021) - Details in  README

## Other popular libraries

- [Piscina](https://npm.im/piscina) - The Node.js worker pool
- [AWS SDK for JavaScript](https://www.npmjs.com/package/aws-sdk) - The official AWS SDK
- [dockerode](https://npm.im/dockerode) - Node.js module for Docker's Remote API

</v-clicks>

---
class: text-xl
---

# With thanks to... 🙏🏻

- [James Snell](https://twitter.com/jasnell/) for sharing the [`Promise.race()` setTimeout pattern](https://www.nearform.com/blog/using-abortsignal-in-node-js/)
- For review and feedback on this talk:
	- [Luciano Mammino](https://twitter.com/loige)
	- [Liam Keaton](https://twitter.com/liamkeaton)
	- [Kevin Cunningham](https://twitter.com/dolearning)
	- [Nick Ramsbottom](https://twitter.com/nickramsbottom)
- For sharing libraries with support for `AbortSignal`:
	- [Tim Perry](https://twitter.com/pimterry/)
	- [James Snell](https://twitter.com/jasnell/)
	- [Trivikram Kamat](https://twitter.com/trivikram)

---
layout: image-right
image: 'https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2400'
---

# Thank you! 💫

<div>

<p class="text-2xl py-12">

🍨 Slides and `code` at

[simonplend.com/nodeconf2021](https://simonplend.com/nodeconf2021)

</p>

</div>

<div class="my-10 grid grid-cols-[35px,1fr] w-min gap-y-4">
  <ri-twitter-line class="opacity-80 text-blue-400"/>
  <div><a href="https://twitter.com/simonplend" target="_blank">@simonplend</a></div>
  <ri-github-line class="opacity-60"/>
  <div><a href="https://github.com/simonplend" target="_blank">simonplend</a></div>
  <ri-user-3-line class="opacity-80 text-yellow-500"/>
  <div><a href="https://simonplend.com" target="_blank">simonplend.com</a></div>
</div>

<div class="mt-18 text-xs italic opacity-30">

Photo by [Casey Horner](https://unsplash.com/@mischievous_penguins) on [Unsplash](https://unsplash.com/photos/RmoWqDCqN2E)

</div>

<!--
- If you'd like to talk about working together you can get in touch through my website
-->
