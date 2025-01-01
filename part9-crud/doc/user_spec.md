# User API Specification

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

- Success (201)

```json
{
  "message": "User created",
  "data": {
    "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
    "email": "code@gmail.com",
    "password": "********",
    "name": "Pojok Code"
  }
}
```

- Error (404 Not found)

```json
{
  "message": "User not found",
  "data": null
}
```

## End Point Get All User

### Request

- Method
  GET
- URL
  {{BASE_URl}}/users
- Header
  Authorization: Bearer xxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "success",
  "data": [
    {
      "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
      "email": "code@gmail.com",
      "password": "********",
      "name": "Pojok Code"
    }
  ]
}
```

- Error (500)

```json
{
  "message": "somting went wrong",
  "data": null
}
```

## End Point Get User By Id

### Request

- Method
  GET
- URL
  {{BASE_URl}}/users/xxxx
- Header
  Authorization: Bearer xxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "success",
  "data": [
    {
      "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
      "email": "code@gmail.com",
      "password": "********",
      "name": "Pojok Code"
    }
  ]
}
```

- Error (500)

```json
{
  "message": "somting went wrong",
  "data": null
}
```

## End Point Update User

### Request

- Method
  PUT
- URL
  {{BASE_URl}}/users/xxxx
- Header
  Authorization: Bearer xxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "User updated",
  "data": [
    {
      "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
      "email": "code@gmail.com",
      "password": "********",
      "name": "Pojok Code"
    }
  ]
}
```

- Error (500)

```json
{
  "message": "somting went wrong",
  "data": null
}
```

## End Point Delete User

### Request

- Method
  DELETE
- URL
  {{BASE_URl}}/users/xxxx
- Header
  Authorization: Bearer xxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "User deleted",
  "data": true
}
```

- Error (500)

```json
{
  "message": "User not found",
  "data": null
}
```

## Endpoints User Login

### Request

- Method
  POST
- URL
  {{BASE_URl}}/login
- Header
  Content-Type: application/json
- Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- Success (200 OK)

```json
{
  "message": "Login successful",
  "data": {
    "id": "71f6711c-b778-435f-b97c-fc3d876ed7fc",
    "email": "code@gmail.com",
    "password": "********",
    "name": "Pojok Code"
  }
}
```

- Error (401 Unauthorized)

```json
{
  "message": "Invalid credentials",
  "data": null
}
```
