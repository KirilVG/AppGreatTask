import { ApiRoute } from "@/constants/apiConstants";
import { handleError } from "@/utils/apiCalls";
import { IPicture } from "@@/types";
import axios from "axios";

export async function createPicture(data: IPicture) {
    try {
        const response = await axios.post(`${ApiRoute}/pictures`, data, { withCredentials: true });

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function updatePicture(data: IPicture) {
    try {
        const response = await axios.patch(`${ApiRoute}/pictures/${data._id}`, data);

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getAllPictures() {
    try {
        const response = await axios.get(`${ApiRoute}/pictures`);

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function getPictureById(id: string) {
    try {
        const response = await axios.get(`${ApiRoute}/pictures/${id}`);

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export async function deletePictureById(id: string) {
    try {
        const response = await axios.delete(`${ApiRoute}/pictures/${id}`);

        return response.data;
    } catch (error) {
        return handleError(error);
    }
}