# Simple CRUD API

## CI

![FEATURE TEST](https://github.com/kevariable/ts-restful-api/actions/workflows/feature-test.yml/badge.svg)

## STACK

- TypeScript
- Express JS
- Prisma
- Jest
- Docker

## API Spec

- [User API Spec](./docs/user.spec.md)
- [Contact API Spec](./docs/contact.spec.md)
- [Address API Spec](./docs/address.spec.md)

## Basic Usage

```
docker compose up -d
```

## Testing

```
docker compose exec app npm run test
```

## Format

```
docker compose exec app npm run format
```

## User Facing

```
http://localhost:3310
```
