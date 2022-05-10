const asyncHandler = require('express-async-handler')

const Activity = require('../models/activityModel')
const User = require('../models/userModel')

// @desc    Get activities
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ user: req.user.id })

  res.status(200).json(activities)
})

// @desc    Set activity
// @route   POST /api/activities
// @access  Private
const setActivity = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const activity = await Activity.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(activity)
})

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id)

  if (!activity) {
    res.status(400)
    throw new Error('Activity not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the activity user
  if (activity.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedActivity)
})

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id)

  if (!activity) {
    res.status(400)
    throw new Error('Activity not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the activity user
  if (activity.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await activity.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getActivities,
  setActivity,
  updateActivity,
  deleteActivity,
}
