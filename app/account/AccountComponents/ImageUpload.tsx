import React, { useState } from 'react';

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (file) {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: file,
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className=" input w-full outline-none px-[10px] py-[16px] opacity-40 "
      />
      <button
        className=" mx-auto ml-2 flex hover:bg-secondary/75  justify-center rounded-md   font-light text-md items-center h-[35px] w-[100px] border-primary border text-primary text-md   mt-3 "
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
