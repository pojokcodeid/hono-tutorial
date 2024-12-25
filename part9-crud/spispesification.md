# Todo API Specification

## Base URL

http://localhost:3000/

## Endpoints Crete User

### Request

- Method
  POST
- URL
  {{BASE_URl}}/users
- Header
  Content-Type: application/json
- Request Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Response

- Success

```json
{
  "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
  "email": "code@gmail.com",
  "password": "********",
  "name": "Pojok Code"
}
```

- Error (404 Not found)

```json
{
  "message": "User not found"
}
```
