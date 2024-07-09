import { model, Schema } from "mongoose";
import { DBPicture } from "../types";

const PictureSchema: Schema = new Schema<DBPicture>({
    imageUri: {
        type: String,
    },
    title:  {
        type: String,
        required: [true, "Title is required"],
        unique: true,
        maxlength: [100, "Title can not excide 100 characters"],
    },
    description:  {
        type: String,
    },
    dateCreated: {
        type: Date
    },
});

export const Picture = model<DBPicture>("Picture", PictureSchema);