# API keys

Keep out of source contorl. This can be achieved via storing them as enviroment variables on the server.

Single page apps (SPA) like create react app are built in the users browser. Enviroment variables are injected into code at deployment time. This means you have 2 options:

1. limit access to the API via CORS (cross origin resource sharing). Hackers could still find way to spoof the origin.
2. create server that your SPA can hit, that will call your API (proxy), thus not exposing your API keys.
