# host-with-the-most

This is a simple fileserver with a React frontend that automatically formats JavaScript snippets and is easy to self-host

## Motivation

It was my friend Kevin's idea

## Running a Dev Server

`npm run dev`

## Installation

- You'll need an ubuntu server, like the ones provided by DigitalOcean, with a non-root user with sudo privileges. You'll also need Docker and docker-compose installed. Then, clone the repo into the folder `filepret`.
- Create a .env file.
- Create two `A` records which redirect from your domain name to the new server instance. One without `www.`, and one with.
- Run `source '.env' && sh 'install.sh'`

## Live "Demo"

[Enjoy](https://host-with-the-most.now.sh/)

## Roadmap

- Migration to a Next.js starter template with auth and roting already implemented

  - Possible candidates:
  - https://nextjs-starter.now.sh/
  - https://github.com/PabloSzx/Next-API-Middleware-Passport-Sequelize-TypeScript

- Multiple language support (thanks to prettier) with automatic language detection

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License
