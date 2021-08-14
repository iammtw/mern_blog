var mongoose = require('mongoose');
var CommentSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        userName: {
            type: String,
            required: true
        },

    },
        {timestamps: true}
);


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;