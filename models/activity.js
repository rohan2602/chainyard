const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    modifiedAt: {
        type: Date
    }
});
activitySchema.index({ activityName: 1, isDeleted: 1 }, { unique: true });
// activitySchema.index({ activityName: 1 }, { unique: true });
const Activity = mongoose.model('activity', activitySchema);
module.exports = Activity;