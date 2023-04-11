# Full Stack App

Demo of putting a vite app and an Express app together.

Video: <https://watch.screencastify.com/v/B7p9XP8T9NfwosYjJnbP>

## Dev Proxy

During development you're on 2 separate servers, so that means that the dev server doesn't know about your api routes, so you need a [proxy](https://vitejs.dev/config/server-options.html#server-proxy) to forward that request on to the server. See vite.config.js in the client directory.

## Winston Logging

<https://lioncoding.com/logging-in-express-js-using-winston-and-morgan/>