import { ChangeEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";

export function CampoDropzone3() {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) { return; }
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map(image => { return URL.createObjectURL(image); });
    setPreviewImages(selectedImagesPreview);
  }

  /*
    images.forEach(image => {
      data.append('images', image);
    });
  */

  return (
    <div className="input-block">
      <label htmlFor="images">Fotos</label>
      <div className="images-container">
        {previewImages.map(image => (<img key={image} src={image} alt={"name"} />))}
        <label htmlFor="image[]" className="new-image">
          <FiPlus size={24} color="#15b6d6" />
        </label>
      </div>
      <input multiple onChange={handleSelectImages} type="file" id="image[]" />
    </div>
  );
}