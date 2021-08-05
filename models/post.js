var mongoose = require('mongoose');
var PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    },
        {timestamps: true}
);


var Post = mongoose.model('Post', PostSchema);
module.exports = Post;