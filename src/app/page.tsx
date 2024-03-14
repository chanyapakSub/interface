'use client'

import FileUpload from '../app/componant/UploadDragDrop'; // ปรับชื่อไฟล์และ path ให้ตรงกับที่อยู่จริงของ component
import React, { useState } from 'react';

export default function Page() {
  const [result, setResult] = useState<string>('');
  const [accuracy, setAccuracy] = useState<number>(0);

  const handleFileUpload = (response: any) => {
    setResult(response.prediction); // กำหนดค่าผลลัพธ์จากการทำนาย
    setAccuracy(response.probability); // กำหนดค่าความแม่นยำ
  };
  return (
    <div className='grid grid-cols-1 bg-gradient-to-r from-[#ebcfff] via-[#f5edff] to-[#B7E5FF] h-screen justify-items-center self-center items-center'>
      <main className='flex flex-col justify-self-center self-center items-center my-5 bg-white bg-opacity-50 border rounded-3xl py-10 px-20'>
        <div className='flex text-2xl text-center self-center py-5'>
          CCTV IMAGE CLASSIFICATION MODEL
        </div>
        <div className='grid justify-items-center self-center'>
          <FileUpload onFileUpload={handleFileUpload}/>
        </div>
      </main>
    </div>
  );
}