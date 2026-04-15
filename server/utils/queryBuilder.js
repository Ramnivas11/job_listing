'use strict';

/**
 * buildJobFilter — constructs a MongoDB filter object from the
 * validated query parameters passed from the controller.
 *
 * Regex inputs are escaped to prevent injection.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildJobFilter({ search, location, type, experience }) {
  const filter = {};

  /* ── Full-text search across title, company, skills ─────── */
  if (search && search.trim()) {
    const escaped = escapeRegex(search.trim());
    filter.$or = [
      { title: { $regex: escaped, $options: 'i' } },
      { company: { $regex: escaped, $options: 'i' } },
      { skills: { $regex: escaped, $options: 'i' } },
    ];
  }

  /* ── Location filter (partial, case-insensitive) ─────────── */
  if (location && location.trim()) {
    filter.location = { $regex: escapeRegex(location.trim()), $options: 'i' };
  }

  /* ── Job type exact match ────────────────────────────────── */
  if (type && type.trim()) {
    filter.type = type.trim();
  }

  /* ── Experience level exact match ────────────────────────── */
  if (experience && experience.trim()) {
    filter.experience = experience.trim();
  }

  return filter;
}

/**
 * buildSortObject — maps a sort key string to a MongoDB sort object.
 */
function buildSortObject(sort) {
  const sortMap = {
    salary_asc: { salary: 1 },
    salary_desc: { salary: -1 },
    date_desc: { createdAt: -1 },
    date_asc: { createdAt: 1 },
  };
  return sortMap[sort] || { createdAt: -1 };
}

module.exports = { buildJobFilter, buildSortObject };
