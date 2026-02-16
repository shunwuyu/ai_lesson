# API Index Template

Use this template for the API overview page:

```markdown
# {API Name} API Reference

{Brief description of the API}

## Base URL
`{BASE_URL}`

## Authentication
{Description of authentication methods}

## Endpoints

### {Resource Group 1}
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /resource | List all resources |
| POST | /resource | Create a resource |
| GET | /resource/:id | Get a specific resource |
| PUT | /resource/:id | Update a resource |
| DELETE | /resource/:id | Delete a resource |

### {Resource Group 2}
| Method | Endpoint | Description |
|--------|----------|-------------|
| ... | ... | ... |

## Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting
{Rate limiting information if applicable}

## Versioning
{API versioning strategy}
```
