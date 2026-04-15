'use strict';

const Job = require('../models/Job');
const { buildJobFilter, buildSortObject } = require('../utils/queryBuilder');

/**
 * GET /api/jobs
 *
 * Query params (all optional):
 *  page        – page number (default 1)
 *  limit       – results per page (default 10, max 100)
 *  search      – case-insensitive regex on title, company, skills
 *  location    – partial match (case-insensitive) on location
 *  type        – Full-time | Part-time | Remote
 *  experience  – Entry-level | Mid-level | Senior | Lead
 *  sort        – salary_asc | salary_desc | date_desc | date_asc
 */
const getJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      location = '',
      type = '',
      experience = '',
      sort = 'date_desc',
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const filter = buildJobFilter({ search, location, type, experience });
    const sortObj = buildSortObject(sort);
    const skip = (pageNum - 1) * limitNum;

    const [total, jobs] = await Promise.all([
      Job.countDocuments(filter),
      Job.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
    ]);

    const pages = Math.ceil(total / limitNum);

    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      pages,
      hasNextPage: pageNum < pages,
      hasPrevPage: pageNum > 1,
      message: total === 0 ? 'No jobs found matching your criteria.' : `Found ${total} job${total !== 1 ? 's' : ''}.`,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/jobs/:id
 * Returns a single job by its MongoDB _id.
 */
const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    /* Basic ObjectId format guard */
    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID format.',
      });
    }

    const job = await Job.findById(id).lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getJobs, getJobById };
