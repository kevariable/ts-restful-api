# Address API Spec

## Create Address

Endpoint: POST /api/contacts/{contactId}/addresses

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street A. 12",
  "city": "Edinburgh",
  "province": "Edinburgh",
  "country": "Scotland",
  "postal_code": "A12"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "contact_id": 1,
    "street": "Street A. 12",
    "city": "Edinburgh",
    "province": "Edinburgh",
    "country": "Scotland",
    "postal_code": "A12"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "postal_code is required."
}
```

## Get Address

Endpoint: GET /api/contacts/{contactId}/addresses/{addressId}

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "contact_id": 1,
    "street": "Street A. 12",
    "city": "Edinburgh",
    "province": "Edinburgh",
    "country": "Scotland",
    "postal_code": "A12"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Address ID: {addressId} not found."
}
```

## Update Address

Endpoint: PUT /api/contacts/{contactId}/addresses/{addressId}

Request Header:
- X-API-TOKEN: token

Request Body:

```json
{
  "street": "Street A. 12",
  "city": "Edinburgh",
  "province": "Edinburgh",
  "country": "Scotland",
  "postal_code": "A12"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Street A. 12",
    "city": "Edinburgh",
    "province": "Edinburgh",
    "country": "Scotland",
    "postal_code": "A12"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "postal_code is required."
}
```

## Delete Address

Endpoint: DELETE /api/contacts/{contactId}/addresses/{addressId}

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
  "errors": "Address ID: {addressId} not found."
}
```

## List Address

Endpoint: GET /api/contacts/{contactId}/addresses/{addressId}

Request Header:
- X-API-TOKEN: token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Street A. 12",
      "city": "Edinburgh",
      "province": "Edinburgh",
      "country": "Scotland",
      "postal_code": "A12"
    },
    {
      "id": 2,
      "street": "Street A. 13",
      "city": "Edinburgh",
      "province": "Edinburgh",
      "country": "Scotland",
      "postal_code": "A13"
    }
  ]
}
```

Response Body (Failed):

```json
{
  "errors": "Contact ID: {contactId} not found."
}
```