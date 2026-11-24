# Name catalogue API v1

These endpoints expose the current editorial pilot as JSON. The pilot is served from typed static data; `supabase/migrations/0002_name_catalog.sql` defines a future editorial store and has not been applied to a database.

## Endpoints

| Method and path | Purpose |
|---|---|
| `GET /api/v1/names` | List name profiles. Optional `q`, `tradition`, `limit` (1–100), and `cursor` query parameters. |
| `GET /api/v1/names/{slug}` | Return one profile, its attributed relationships, and a page of scripture references. Optional `referenceLimit` and `referenceCursor` parameters. |
| `GET /api/v1/search?q={query}` | Search names, reference locations, topics, and comparison entries. Exact name matches rank first. |
| `GET /api/v1/resolve?name={surface}` | Resolve an exact normalized name form. Returns `resolved`, `ambiguous`, or `not_found`; it does not merge records. |

## Response behavior

- Lists return `data` and `meta` with `totalCount`, `limit`, `nextCursor`, and `hasMore`.
- A cursor is the final slug or reference location from the previous page. It is scoped to the current filtered result set; an unknown cursor returns HTTP 400 with `invalid_cursor`.
- An unsupported tradition or page size returns HTTP 400 with a specific error code.
- An unknown profile slug returns HTTP 404 with `slug_not_found`.
- An empty search returns HTTP 200 with an empty list. Name resolution returns HTTP 200 with `status: "not_found"` when no exact candidate exists.
- Ambiguous matches remain separate candidates with their own contexts and references. Relationships are claims with editorial review status, not automatic identity merges.
- External source text is not copied into API responses. Links and edition notes remain available when a source site cannot be reached.

The content revision currently exposed by profile responses is `1`. The API and seeded profiles must be updated together when the editorial revision changes.
