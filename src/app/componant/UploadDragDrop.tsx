import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface FileUploadProps {
  onFileUpload: (response: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://my-cctv-api.onrender.com/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.result);
      setAccuracy(response.data.accuracy);
      onFileUpload("Upload successful!");
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main className='grid grid-rows-2 grid-flow-col '>
      <div className='bg-[#E6F2FF] w-[720px] h-[377px] border-[#82BCFF] border-dashed border-4 rounded-3xl grid grid-cols-1 justify-items-center self-center item-center'>
        <div {...getRootProps()} className={`flex justify-items-center self-center item-center text-[24px] ${isDragActive ? 'bg-gray-100' : ''}`}>
          <input {...getInputProps()} />
          {selectedFile ? (
            <>
              {previewUrl && (
                <div className='flex justify-items-center self-center item-center text-[24px] relative'>
                  <img src={previewUrl} alt="Preview" className="h-[370px] rounded-3xl" />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} className="stroke-[#27265C] absolute right-0 top-0 w-[25px] h-[25px] fill-white bg-white bg-opacity-50 border rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </>
          ) : (
            <div>ลากไฟล์ลงที่นี่ หรือ <button className='text-[24px] text-[#1A6EDB] text-bold'> ค้นหาไฟล์</button></div>
          )}
        </div>
      </div>
      <main className='grid grid-cols-2 my-5 gap-3'>
        <div className='p-5 text-black border rounded-2xl'>
          Result: {result}
        </div>
        <div className='p-5 text-black border rounded-2xl'>
          Accuracy: {accuracy}%
        </div>
      </main>
    </main>
  );
};

export default FileUpload;
