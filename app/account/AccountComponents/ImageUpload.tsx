import React, { useEffect, useState } from 'react';

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  // useEffect(() => {
  //   const initialFile = new File(
  //     [''],
  //     'app/assets/Eco-harbor-1default-profile-image.jpeg',
  //     { type: 'image/jpeg' }
  //   );
  //   setFile(initialFile);
  // }, []);

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
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className=" mx-auto flex  justify-center rounded-md   font-light text-md items-center h-[35px] w-[80px] border-primary border text-primary text-md ml-0  mt-3 "
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
