## Developing

install dependencies with `npm install` (or `pnpm install` or `yarn`)

then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

### Docker

run `docker build .`

### Manually

run `npm run build`

## Running

make sure the [gradio backend](https://github.com/NutchapolSal/aiproject#publicimagemining) is running

### Docker Compose

copy `docker-compose.yaml` into an empty directory, edit environment variables, then `docker compose up`

### Manually

set environment variables (refer to `docker-compose.yaml`), then run `node .output/server/index.mjs`

only files and folder in the `.output` folder are needed, the rest of the repo is not needed for running after build

<sup>node versions older than 22 may work, we did not check</sup>