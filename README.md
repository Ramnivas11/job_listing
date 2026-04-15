# Job Explorer

A production-ready full-stack job listings application built with the MERN stack. Browse, search, filter, sort, and paginate job listings — with a clean, responsive UI and a well-structured REST API.

---

## Features

### Backend
- `GET /api/jobs` — search, filter, sort, and paginate with full validation
- `GET /api/jobs/:id` — fetch a single job for the detail page
- Search across **title**, **company**, and **skills** using MongoDB regex
- Filter by **location**, **job type**, and **experience level**
- Sort by **salary** (asc/desc) or **date posted** (asc/desc)
- Efficient pagination using `skip` + `limit` with parallel `countDocuments`
- Request validation middleware — returns `400` for invalid params
- Centralized error handling — `404` for unknown routes, `500` for server errors
- Query logic extracted to `utils/queryBuilder.js` for clean separation of concerns
- All fields indexed for performant queries: `title`, `company`, `skills` (text), `location`, `type`, `experience`, `salary`, `createdAt`

### Frontend
- Debounced search input (500ms) with live "Searching..." indicator
- Experience level filter dropdown (Entry-level / Mid-level / Senior / Lead)
- Location and job type filter dropdowns
- Sort dropdown (Newest, Oldest, Salary High→Low, Salary Low→High)
- "Clear Filters" button — visible only when filters are active
- Page resets automatically when any filter or search term changes
- Keyword highlighting in job title and company name
- Job cards showing: title, company, location, type badge, experience badge, salary, skills tags, posted date
- **Job Detail page** at `/job/:id` — full description, metadata grid, skills, Apply button
- **Apply Now** — persisted to localStorage, shows "Already Applied" state on return
- **Save Job** — bookmark any job, persisted to localStorage
- Skeleton card loaders matching the card layout (no generic spinners)
- Empty state with guidance, error state with retry button
- Fully responsive: single column mobile → two-column desktop grid

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router v6 |
| Styling | Tailwind CSS v4 (Vite plugin), Outfit font |
| Icons | Phosphor Icons |
| HTTP Client | Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose 8 |

---

## Project Structure

```
intern_assignment/
├── server/
│   ├── controllers/
│   │   └── jobController.js      # getJobs + getJobById
│   ├── middleware/
│   │   ├── validateQuery.js      # Query param validation → 400
│   │   └── errorHandler.js       # 404 + 500 handlers
│   ├── models/
│   │   └── Job.js                # Mongoose schema + indexes
│   ├── routes/
│   │   └── jobRoutes.js          # GET / and GET /:id
│   ├── utils/
│   │   └── queryBuilder.js       # buildJobFilter + buildSortObject
│   ├── seed.js                   # Seeds 30 realistic jobs
│   ├── server.js                 # Express entry point
│   └── .env
│
└── client/
    └── src/
        ├── api/
        │   └── jobs.js           # Axios instance, fetchJobs, fetchJobById
        ├── hooks/
        │   ├── useDebounce.js    # 500ms debounce
        │   ├── useJobs.js        # All listing state + filters
        │   ├── useSavedJobs.js   # localStorage bookmark toggle
        │   └── useAppliedJobs.js # localStorage apply tracking
        ├── components/
        │   ├── SearchBar.jsx     # Search input with Searching... state
        │   ├── FilterBar.jsx     # Location, type, experience, clear
        │   ├── SortDropdown.jsx  # Sort select
        │   ├── JobCard.jsx       # Card with skills, badges, View link
        │   ├── JobGrid.jsx       # 2-column CSS Grid
        │   ├── Pagination.jsx    # Smart ellipsis pagination
        │   ├── LoadingSpinner.jsx # Skeleton card loaders
        │   ├── EmptyState.jsx    # No results
        │   └── ErrorMessage.jsx  # Error + retry
        └── pages/
            └── JobDetail.jsx     # /job/:id detail + Apply Now
```

---

## Setup

### Prerequisites
- Node.js v18+
- MongoDB running on `localhost:27017`

### 1. Clone

```bash
git clone <your-repo-url>
cd intern_assignment
```

### 2. Backend

```bash
cd server
npm install
```

`.env` (already included):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/job_listings
```

### 3. Seed the database

```bash
npm run seed
```

Inserts 30 diverse jobs with titles, companies, locations, types, experience levels, skills, and salaries.

### 4. Start the backend

```bash
npm run dev        # nodemon — auto-restarts on changes
# or
npm start          # production
```

API available at `http://localhost:5000`

### 5. Frontend

```bash
cd ../client
npm install
npm run dev
```

App at `http://localhost:5173` — Vite proxies `/api/*` to Express.

---

## API Reference

### `GET /api/jobs`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number (≥ 1) |
| `limit` | integer | `10` | Results per page (1–100) |
| `search` | string | `""` | Searches title, company, skills |
| `location` | string | `""` | Partial match on location |
| `type` | string | `""` | `Full-time`, `Part-time`, `Remote` |
| `experience` | string | `""` | `Entry-level`, `Mid-level`, `Senior`, `Lead` |
| `sort` | string | `date_desc` | `date_desc`, `date_asc`, `salary_desc`, `salary_asc` |

**Response:**
```json
{
  "success": true,
  "total": 8,
  "page": 1,
  "pages": 4,
  "hasNextPage": true,
  "hasPrevPage": false,
  "message": "Found 8 jobs.",
  "data": [...]
}
```

### `GET /api/jobs/:id`

Returns a single job or `404` if not found.

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Senior React Developer",
    "company": "TechNova Solutions",
    "experience": "Senior",
    "skills": ["React", "TypeScript", "GraphQL"],
    "salary": 145000,
    ...
  }
}
```

### `GET /health`

```json
{ "status": "ok", "timestamp": "..." }
```

---

## Edge Cases

| Scenario | Behavior |
|----------|---------|
| `page=-1` | 400: must be a positive integer |
| `limit=0` | 400: must be between 1 and 100 |
| `type=Contract` | 400: must be one of Full-time, Part-time, Remote |
| `experience=Intern` | 400: must be one of Entry-level, Mid-level, Senior, Lead |
| `sort=random` | 400: must be one of date_desc, date_asc, salary_desc, salary_asc |
| `/api/jobs/bad-id` | 400: invalid ID format |
| `/api/jobs/000000000000000000000000` | 404: job not found |
| No search results | 200 with empty `data[]` and guidance message |
| DB connection failure | 500 with error message |
| Rapid typing | Debounced — API called 500ms after last keystroke |
| Apply click | Stored in localStorage; shows "Already Applied" on revisit |

---

## Deployment

### Render (Backend)

1. Create a new **Web Service** pointing to the `/server` directory
2. Build command: `npm install`
3. Start command: `npm start`
4. Set environment variables:
   - `MONGO_URI` — MongoDB Atlas connection string
   - `PORT` — set by Render automatically

### Vercel (Frontend)

1. Create a new project pointing to the `/client` directory
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set environment variable:
   - `VITE_API_BASE_URL` — your Render backend URL (e.g. `https://your-api.onrender.com`)

---

## Planned Improvements

- Authentication (JWT) — user accounts, personal saved/applied lists
- Advanced filters — salary range slider, date range picker
- Fuzzy search using MongoDB Atlas Search
- Job posting admin panel
- Email notifications for saved job updates
- Infinite scroll as an alternative to pagination
