import { IPicture } from "@@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import dafaultImg from "../assets/defaultPicture.jpg";
import { Button } from "./ui/button";

interface IPictureCardProps {
	picture: IPicture;
    handleDelete: (id: string) => void;
    handleEdit: (cocktail: IPicture) => void;
}

export function PictureCard(props: IPictureCardProps) {
    return(<div>
        <Card className="flex flex-col bg-white h-full text-white">
            <img
				alt="Cocktail-Image"
				className="w-full h-[18rem] object-cover rounded-xl"
				src={props.picture.imageUri || dafaultImg}
				loading="lazy"
			/>
			<div className="flex flex-col flex-grow text-black">
                <CardHeader className="flex flex-col pb-[1rem]">
                    <div className="flex flex-row justify-between min-h-12">
                        <CardTitle className="text-black flex-grow whitespace-normal break-words max-w-full pr-[1rem] flex items-center">
                            <p>{props.picture.title}</p>
                        </CardTitle>
                        <div className="flex flex-row space-x-2 ">
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleEdit(props.picture);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleDelete(props.picture._id || "");
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent
			        id="events-card-content"
			        className="text-gray-500 text-sm dark:text-gray-400"
		        >
			        <CardDescription className="max-w-[32rem] text-ellipsis whitespace-nowrap overflow-hidden cut-text">
				        {props.picture.description}
			        </CardDescription>
		        </CardContent>
			</div>
		</Card>
    </div>);
}