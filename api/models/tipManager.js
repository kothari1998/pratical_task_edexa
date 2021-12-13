module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          user_id: { 
            type: String, required: true
          },
          place: {
             type: String,
             required: true
          },
          total_amount: { 
            type: Number,
            required: true
          },
          tipPercentage: { 
            type: Number,
            required: true
          },
          start_date: {
            type: String,
            required: true
          },
          end_date: {
            type: String,
            required: true
         } 
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const hotelData = mongoose.model("hotels", schema);
    return hotelData;
};