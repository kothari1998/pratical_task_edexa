module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            profile_picture:  {
                type: String,
                required: true
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                validate: {
                    validator: function(v) {
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                    },
                    message: "Please enter a valid email"
                },
                required: [true, "Email required"]
            },
            password: { type: String, required: true },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const userData = mongoose.model("users", schema);
    return userData;
};