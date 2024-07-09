import { getAllPictures } from "@/api/picturesCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { IPicture } from "@@/types";
import { useEffect, useState } from "react";

const usePicturesFetcher = () => {
	const [items, setItems] = useState<IPicture[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loadingItems, setLoadingItems] = useState<boolean>(true);

	useEffect(() => {
		const fetchItems = async () => {
			setLoadingItems(true);
			const cocktailsData = await getAllPictures();
			if (cocktailsData instanceof AppError) {
				const errorMessage = handleError(cocktailsData);
				setErrorMessage(errorMessage);
			} else {
				setItems(cocktailsData);
			}

			setLoadingItems(false);
		};

        fetchItems()
	}, []);

	return { items, setItems, loadingItems, errorMessage };
};

export default usePicturesFetcher;