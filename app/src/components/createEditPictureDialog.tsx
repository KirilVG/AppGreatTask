
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { IPicture } from "@@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ICreateEditDialogProps {
    itemForEdit: IPicture | null;
    closeDialog: () => void;
    handleCreate: (item: IPicture) => void;
    handleEdit: (item: IPicture) => void;
}

type IPictureFormInputs = {
    title: string;
    description: string;
}

export function CreateEditPictureDialog(props: ICreateEditDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPictureFormInputs>()
    const [file, setFile] = useState<string | ArrayBuffer | null>();

    const onSubmit: SubmitHandler<IPictureFormInputs> = (data) => {
        if(!props.itemForEdit) {
            const newItem: IPicture = {
                title: data.title,
                dateCreated: new Date(),
                description: data.description,
                imageUri: file?.toString() || ""
            };

            data.title = "";
            data.description = "";
            setFile("");

            props.handleCreate(newItem);
        } else {
            const newItem: IPicture = {
                _id:  props.itemForEdit._id,
                title: data.title,
                dateCreated: props.itemForEdit.dateCreated,
                description: data.description,
                imageUri: file?.toString() || props.itemForEdit.imageUri
            };
            props.handleEdit(newItem)
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            alert("Failed to select the chosen file");
            setFile(null);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setFile(reader.result);
            };
            reader.onerror = function (error) {
                alert(error);
                setFile(null);
            };
        }
    }

    return (
        <Dialog open={true} onOpenChange={props.closeDialog}>
			<DialogContent className="border-[#C9942A] border-2 max-w-[50em] max-h-[55em] md:max-h-[45em] overflow-y-auto rounded-xl">
				<DialogHeader className="mb-8 sm:text-center">
					<DialogTitle>
						{props.itemForEdit
							? "Edit Picture"
							: "Create Picture"
                        }
					</DialogTitle>
				</DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-[#9b9a9b]">Title:</label>
                        {errors.title && <span>The field is required</span>}
                        <input 
                            className="border-[#C9942A] border-2 rounded" 
                            defaultValue={props.itemForEdit?.title || ""} 
                            {...register("title",{ required: true })} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#9b9a9b]">Describtion:</label>
                        <textarea 
                            className="border-[#C9942A] border-2 rounded min-h-32" 
                            defaultValue={props.itemForEdit?.description || ""} 
                            {...register("description")} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#9b9a9b]">ImageURI:</label>
                        <input type="file" accept=".jpg,.png" onChange={handleFileChange}/>
                    </div>
                    <Button
                        type="submit"
                        className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                        id="Edit-Button"
                    >
                        Submit
                    </Button>
                </form>
			</DialogContent>
		</Dialog>
    );
}