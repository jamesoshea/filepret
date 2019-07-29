# host-with-the-most

This is a simple fileserver with a React frontend that automatically formats JavaScript snippets and is easy to self-host

## Motivation

It was my friend Kevin's idea

## Running a Dev Server

`npm run dev`

## Installation

You'll need an ubuntu server, like the ones provided by DigitalOcean, with a non-root user with sudo privileges. You'll also need Docker and docker-compose installed. Then, clone the repo into the folder `filepret`.

`docker-compose build`
`docker-compose up`

## Live "Demo"

[Enjoy](https://host-with-the-most.now.sh/)

## Roadmap

- Multiple language support (thanks to prettier) with automatic language detection

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License
