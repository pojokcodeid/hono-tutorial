# Todo API Specification

## Base URL

http://localhost:3000/

## Endpoints Crete User

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
  "title":"string",
  "description":"string"
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
  "data":null
}
```
