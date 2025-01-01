# Todo API Specification

## Base URL

http://localhost:3000/

## Endpoint Crete todo

### Request

- Method
  POST
- URL
  {{BASE_URl}}/todos
- Header
  Authorization: Bearer xxxxxxxx
  Content-Type: application/json
- Request Body

```json
{
  "title": "string",
  "description": "string"
}
```

### Response

- Success (201)

```json
{
  "message": "Todo created",
  "data": {
    "id": "4584cd34-8092-46aa-84ee-82ecea9fe129",
    "title": "example todo",
    "userId": "xxxxxxxxxxxxxxxxxxxxx",
    "description": "ini adalah contoh descripsi",
    "createdAt": "2024-12-27T10:42:00.758Z",
    "updatedAt": "2024-12-27T10:42:00.758Z"
  }
}
```

- Error (401 Unauthorized)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoint get all todos

### Request

- Method
  GET
- URL
  {{BASE_URl}}/todos
- Header
  Authorization: Bearer xxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "success",
  "data": [
    {
      "id": "4584cd34-8092-46aa-84ee-82ecea9fe129",
      "title": "example todo",
      "userId": "xxxxxxxxxxxxxxxxxxxxx",
      "description": "ini adalah contoh descripsi",
      "createdAt": "2024-12-27T10:42:00.758Z",
      "updatedAt": "2024-12-27T10:42:00.758Z"
    }
  ]
}
```

- Error (401 Unauthorized)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoint get todos by id

### Request

- Method
  GET
- URL
  {{BASE_URl}}/todos/xxxxxxxxxxxx
- Header
  Authorization: Bearer xxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "success",
  "data": {
    "id": "4584cd34-8092-46aa-84ee-82ecea9fe129",
    "title": "example todo",
    "userId": "xxxxxxxxxxxxxxxxxxxxx",
    "description": "ini adalah contoh descripsi",
    "createdAt": "2024-12-27T10:42:00.758Z",
    "updatedAt": "2024-12-27T10:42:00.758Z"
  }
}
```

- Error (401 Unauthorized)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoint edit todo

### Request

- Method
  PUT
- URL
  {{BASE_URl}}/todos/xxxxxxxxxxxx
- Header
  Authorization: Bearer xxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "Todo updated",
  "data": {
    "id": "4584cd34-8092-46aa-84ee-82ecea9fe129",
    "title": "example todo",
    "userId": "xxxxxxxxxxxxxxxxxxxxx",
    "description": "ini adalah contoh descripsi",
    "createdAt": "2024-12-27T10:42:00.758Z",
    "updatedAt": "2024-12-27T10:42:00.758Z"
  }
}
```

- Error (401 Unauthorized)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoint delete todo

### Request

- Method
  DELETE
- URL
  {{BASE_URl}}/todos/xxxxxxxxxxxx
- Header
  Authorization: Bearer xxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "Todo deleted",
  "data": true
}
```

- Error (404 Not Found)

```json
{
  "message": "Todo not found",
  "data": null
}
```
