This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites
- node >=18.17.0
- npm installed
- docker installed and running

This project has been developed with the following versions
- npm 10.8.1
- node v20.16
- docker v4.33.1

## Getting Started

If you are running this project from Window you have to edit the docker compose file ```compose.yml``` volumes option with the following format:

```
volumes:
  - [DRIVE]:/[PATH TO PROJECT ROOT FORLDER]:/usr/src/app
```

### Run NextJS locally and PostgreSQL on docker
- Install dependencies ```npm install```
- Start postgres service ```docker compose up postgres -d```
- Generate Prisma ORM client ```npx prisma generate```
- Apply migration to the db ```npx prisma migrate deploy```
- Run NextJS ```⁠npm run dev```

### Run Both services NextJS and PostgreSQL on docker
- Install dependencies ```npm install```
- Start postgres service ```docker compose up postgres -d```
- Generate Prisma ORM client ```⁠docker compose build app```
- Start postgres service ```docker compose up app -d```


---
Open [http://localhost:3000](http://localhost:3000) with your browser to start building your pokemons teams.
