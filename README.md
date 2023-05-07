# SIA PROJECT BACKEND

[![banner](https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif)](https://github.com/jmrl23/sia-itlog)

Backend for barangay system school project

## Quickstart

1. Install dependencies

   `$ yarn`

2. create `.env.development.local` and `.env.production.local`

3. open those files and populate necessary environment variables

4. on development, run migration script

   `$ yarn run prisma:migrate:dev --name="initial_migration"`

5. generate `@prisma/client`

   `$ yarn run prisma:generate`

6. start the application

   `$ yarn run start:dev`

   or

   `$ yarn run start:prod`

## Installation

1. Install Node v16 (LTS) or higher from https://nodejs.org/en

2. Install yarn

   `$ npm i -g yarn`

3. Clone repository

   `$ git clone https://github.com/jmrl23/sia-backend`

4. Navigate to the project directory

   `$ cd sia-backend`

5. Follow [Quickstart](#Quickstart)

You're ready to develop!

## License

[Link](./LICENSE)

```
MIT License

Copyright (c) 2023 Jomariel Gaitera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Development

- Proxy server for collaboration
  - [https://sia-backend.serveo.net](https://sia-backend.serveo.net)
