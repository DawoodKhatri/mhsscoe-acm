import { Schema, model, models } from "mongoose";

const { String, ObjectId } = Schema.Types;

const teamSchema = new Schema(
  {
    year: { type: String, required: true },
    sections: [
      {
        title: { type: String },
        posts: [{ type: ObjectId, ref: "Post" }],
      },
    ],
  },
  { versionKey: false }
);

const Team = models.Team || model("Team", teamSchema);

export default Team;
