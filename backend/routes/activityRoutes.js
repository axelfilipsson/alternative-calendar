const express = require('express')
const router = express.Router()
const {
  getActivities,
  setActivity,
  updateActivity,
  deleteActivity,
} = require('../controllers/activityController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getActivities).post(protect, setActivity)
router.route('/:id').delete(protect, deleteActivity).put(protect, updateActivity)

module.exports = router
