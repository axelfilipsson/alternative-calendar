const mongoose = require('mongoose')

const activitySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    other: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Activity', activitySchema)
