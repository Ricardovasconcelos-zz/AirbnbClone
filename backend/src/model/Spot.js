const { Schema, model } = require("mongoose");

const Spot = new Schema(
  {
    thumbnail: String,
    title: String,
    price: Number,
    city: String,
    itens: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

//TO SHOW IMAGE IN MOBILE
Spot.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

//TO SHOW IMAGE IN MOBILE
// Spot.virtual("thumbnail_url").get(function() {
//   return `http://192.168.0.7:3333/files/${this.thumbnail}`;
// });

module.exports = model("Spot", Spot);
