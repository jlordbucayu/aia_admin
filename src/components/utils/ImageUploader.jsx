import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBannerImage,
  removeHeaderImage,
  setHeaderImg,
} from "../../features/articles/ArticlesSlice";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb = {
  display: "flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: "200px",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "flex",
  width: "auto",
  height: "200px",
};

const ImageUploader = ({ header_image ,banner_image}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [filePreview, setFilePreview] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div class="p-5">
        <img
          src={file.preview}
          className="object-fill h-[350px] w-[1500px]"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            // setFilePreview(file.preview);

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              dispatch(setHeaderImg(reader.result));
            };
          }}
          alt="uploaded"
        />
      </div>
    </div>
  ));

  const handleRemoveImage = () => {
    dispatch(removeHeaderImage());
    dispatch(clearBannerImage())
    setFiles([]);
  };
  const { form } = useSelector((state) => state.articles);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="flex gap-5 flex-col">
      <div className="flex w-full justify-between">
        {" "}
        <label className="font-semibold">Banner Image</label>
        {(header_image || banner_image) ? (
          <button
            className="bg-gray-200 py-2 px-5 rounded"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
        ) : null}
      </div>

      <section className="conatiner border-4 border-dashed border-gray-100 p-5 h-[150px] md:h-[500px] lg:h-[400px] flex items-center justify-center h-full">
        {header_image ? null : (
          <div {...getRootProps({ className: "dropzone text-center " })}>
            <input {...getInputProps()} />
          {banner_image ? null : (<p>Drag 'n' drop some files here, or click to select files</p>)}  
          </div>
        )}
        {thumbs} {banner_image ? <img src={banner_image} alt="banner"/> : null}
      </section>
    </div>
  );
};

export default ImageUploader;
