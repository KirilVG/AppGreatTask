import { createPicture, deletePictureById, updatePicture } from "@/api/picturesCalls";
import usePicturesFetcher from "@/hooks/usePicturesFetcher";
import { AppError } from "@/lib/errorHandler";
import { IPicture } from "@@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { CreateEditPictureDialog } from "./createEditPictureDialog";
import { Spinner } from "./ui/spinner";
import { PictureCard } from "./pictureCard";


export function PicturesList() {
  const { items, setItems, loadingItems } = usePicturesFetcher();
  const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [ itemForEdit, setItemForEdit] = useState<IPicture | null>(null);
  const [ filterValue, setFilterValue] = useState<string>("");

  async function handleDelete(id: string) {
    const result = await deletePictureById(id);

    if (result instanceof AppError) {
      alert("failed to delete the picture")
    } else {
      let newList = items.filter(item => item._id != id);

      setItems(newList);
    }
  }

  function openCreation() {
    setIsDialogOpen(true);
    setItemForEdit(null);
  }

  async function handleCreate(item: IPicture) {
    const result = await createPicture(item);

    if (result instanceof AppError) {
      alert("Failed to create the picture");
    } else {
      const newList = items;
      newList.unshift(result);

      setItems(newList);
      setIsDialogOpen(false);
    }
  }

  async function handleEdit(changedItem: IPicture) {
    const result = await updatePicture(changedItem);

    if (result instanceof AppError) {
      alert("Failed to update Picture")
    } else {
      const newList = items;
      const indexToUpdate = newList.findIndex(
        (item) => item._id === changedItem._id
      );
  
      if (indexToUpdate !== -1) {
        newList[indexToUpdate] = changedItem;
      }

      setItems(newList);
      setIsDialogOpen(false);
    }
  }

  function openEdit(item: IPicture) {
    setIsDialogOpen(true);
    setItemForEdit(item);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  const filteredData = items.filter(item => item.title.toLowerCase().includes(filterValue.toLocaleLowerCase()))

  return (
    <div>
      <div className="flex flex-col md:pl-10 md:pr-10 w-full">
        <header className="flex justify-between items-center p-5">
          <h1 className="font-bold text-4xl">
            Pictures
          </h1>
          <Button
            className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
            id="Add-Button"
            onClick={() => openCreation()}
          >
            Add
          </Button>
        </header>
        <div className="px-5 flex gap-3">
          <span>
            Filter
          </span>
          <input type="text" className="border-[#C9942A] border-2 rounded" value={filterValue} onChange={(e) => {setFilterValue(e.target.value)}}></input>
        </div>
        {isDialogOpen && <CreateEditPictureDialog itemForEdit={itemForEdit} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-4">
          {loadingItems ? (
            <div className="flex justify-center items-center w-full">
              <Spinner size="large" />
            </div>
          ) : (
            <>
              {filteredData && filteredData.length > 0 ? (
                filteredData?.map((data, index) => (
                  <div key={data._id || index}>
                    <PictureCard picture={data} handleDelete={handleDelete} handleEdit={openEdit}/>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  No pictures
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}