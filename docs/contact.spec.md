# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "first_name": "Kevin Abrar",
  "last_name": "Khansa",
  "email": "kevariable@gmail.com",
  "phone": "60"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Kevin Abrar",
    "last_name": "Khansa",
    "email": "kevariable@gmail.com",
    "phone": "60"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "first_name is required."
}
```

## Get Contact

Endpoint: GET /api/contacts/{contactId}

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Kevin Abrar",
    "last_name": "Khansa",
    "email": "kevariable@gmail.com",
    "phone": "60"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Contact ID: {contactId} not found."
}
```

## Update Contact

Endpoint: PUT /api/contacts/{contactId}

Request Header:
- X-API-TOKEN: token

Request Body (Success):

```json
{
    "first_name": "Kevin Abrar",
    "last_name": "Khansa",
    "email": "kevariable@gmail.com",
    "phone": "60"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Kevin Abrar",
    "last_name": "Khansa",
    "email": "kevariable@gmail.com",
    "phone": "60"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Contact ID: {contactId} not found."
}
```

## Delete Contact

Endpoint: DELETE /api/contacts/{contactId}

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
  "errors": "Contact ID: {contactId} not found."
}
```

## Search Contact

Endpoint: GET /api/contacts/search

Request Header:
- X-API-TOKEN: token

Query Params:
- name: string, either contact first_name or last_name, optional
- phone: string, contact phone, optional
- email: string, email address, optional
- page: number, default 1
- size: number, default 10

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Kevin Abrar",
      "last_name": "Khansa",
      "email": "kevariable@gmail.com",
      "phone": "60"
    },
    {
      "id": 2,
      "first_name": "Intan",
      "last_name": "Khansa",
      "email": "intan.dinara@gmail.com",
      "phone": "60"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized user."
}
```