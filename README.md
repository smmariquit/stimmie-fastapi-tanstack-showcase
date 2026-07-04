# FastAPI + TanStack Query Showcase

This repository demonstrates the natural use cases for both **FastAPI** (Python backend) and **TanStack Query** (React frontend).

## Backend (FastAPI)
FastAPI excels at high-performance, type-safe API routing using Pydantic models. We simulate network latency to demonstrate frontend caching.

## Frontend (TanStack Query)
TanStack Query (formerly React Query) excels at server-state synchronization. It automatically handles `isLoading` states, caches data, and invalidates queries via `useMutation` to automatically re-fetch data smooth after a POST request.