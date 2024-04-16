# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "kevin",
  "password": "password",
  "name": "Kevin Abrar Khansa"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "kevariable",
    "name": "Kevin Abrar Khansa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username is required"
}
```

## Login User

Endpoint: POST /api/login

Request Body:

```json
{
  "username": "kevin",
  "password": "password"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "kevariable",
    "name": "Kevin Abrar Khansa",
    "token": "a14969b1-6bdb-4ab2-8714-fd5a72db0037"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username is not exists."
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "username": "kevariable",
    "name": "Kevin Abrar Khansa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized user."
}
```

## Update User

Endpoint: PATCH /api/users

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "data": {
    "password": "password",
    "name": "Kevin Abrar Khansa"
  }
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "kevariable",
    "name": "Kevin Abrar Khansa"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized user."
}
```

## Logout User

Endpoint: DELETE /api/users/logout

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized user."
}
```