import { IPicture } from "../../shared/types";
import { BadRequestError } from "../errors/customErrors";
import { Picture } from "../models/picture";
import { DBPicture } from "../types";

async function create(picture: IPicture): Promise<DBPicture> {
    const newPicture: DBPicture = new Picture(picture);

    newPicture.dateCreated = Date.now();

    const savedPicture = await newPicture.save();

    return savedPicture;
}

async function getAll(): Promise<DBPicture[]> {
    const pictures = await Picture
        .find()
        .sort({ dateCreated: "desc" })
        .limit(100)
        .exec();

    return pictures;
}

async function getById(id: string): Promise<DBPicture> {
    const picture = await Picture.findOne({ _id: id });

    if (!picture) {
        throw new BadRequestError("Picture does not exist");
    }

    return picture;
}

async function deleteById(id: string): Promise<void> {
    const picture = await Picture.findOneAndDelete({ _id: id });

    if (!picture) {
        throw new BadRequestError("Picture does not exist");
    }
}

async function updateById(id: string, values: IPicture): Promise<DBPicture> {
    const picture = await Picture
        .findByIdAndUpdate(id, values, { runValidators: true, new: true }).lean();
        
    if (!picture) {
        throw new BadRequestError("Picture does not exist");
    }

    return picture;
}

export default { create, getAll, getById, deleteById, updateById };