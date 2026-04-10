# Sprint 1: Core Models and Course Data

Status: Not started

## Goal

Implement the product's foundational entities and validate what makes a course playable.

## Scope

- [ ] create domain models for user, course, hole, target, round, and hole score
- [ ] create sample seed data for one playable course
- [ ] implement course validation rules
- [ ] define Supabase schema and migrations
- [ ] preserve historical round context from later course edits

## Definition of done

- one course can be created and marked playable
- one round can be instantiated from the shared model
- invalid courses are blocked before round start
