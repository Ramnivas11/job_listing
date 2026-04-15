'use strict';

const express = require('express');
const router = express.Router();
const { getJobs, getJobById } = require('../controllers/jobController');
const { validateQueryParams } = require('../middleware/validateQuery');

/**
 * GET /api/jobs
 * Search, filter, sort, and paginate job listings.
 */
router.get('/', validateQueryParams, getJobs);

/**
 * GET /api/jobs/:id
 * Retrieve a single job by ID.
 */
router.get('/:id', getJobById);

module.exports = router;
