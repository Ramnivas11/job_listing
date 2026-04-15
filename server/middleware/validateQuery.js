'use strict';

/**
 * validateQueryParams
 * Validates all query parameters for GET /api/jobs before passing
 * control to the controller. Returns 400 on any invalid input.
 */
const validateQueryParams = (req, res, next) => {
  const { page, limit, type, experience, sort } = req.query;

  /* ── page ─────────────────────────────────────────────────── */
  if (page !== undefined) {
    const pageNum = Number(page);
    if (!Number.isInteger(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameter: "page" must be a positive integer.',
      });
    }
  }

  /* ── limit ────────────────────────────────────────────────── */
  if (limit !== undefined) {
    const limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameter: "limit" must be an integer between 1 and 100.',
      });
    }
  }

  /* ── type ─────────────────────────────────────────────────── */
  const allowedTypes = ['Full-time', 'Part-time', 'Remote'];
  if (type !== undefined && type.trim() !== '' && !allowedTypes.includes(type.trim())) {
    return res.status(400).json({
      success: false,
      message: `Invalid query parameter: "type" must be one of: ${allowedTypes.join(', ')}.`,
    });
  }

  /* ── experience ───────────────────────────────────────────── */
  const allowedExperience = ['Entry-level', 'Mid-level', 'Senior', 'Lead'];
  if (experience !== undefined && experience.trim() !== '' && !allowedExperience.includes(experience.trim())) {
    return res.status(400).json({
      success: false,
      message: `Invalid query parameter: "experience" must be one of: ${allowedExperience.join(', ')}.`,
    });
  }

  /* ── sort ─────────────────────────────────────────────────── */
  const allowedSorts = ['salary_asc', 'salary_desc', 'date_desc', 'date_asc'];
  if (sort !== undefined && !allowedSorts.includes(sort)) {
    return res.status(400).json({
      success: false,
      message: `Invalid query parameter: "sort" must be one of: ${allowedSorts.join(', ')}.`,
    });
  }

  next();
};

module.exports = { validateQueryParams };
