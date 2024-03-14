import React, { useState } from 'react';
import FileUpload from './UploadDragDrop';

const UploadProcess: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [accuracy, setAccuracy] = useState<number>(0);

  const handleFileUpload = (response: any) => {
    setResult(response.prediction); // กำหนดค่าผลลัพธ์จากการทำนาย
    setAccuracy(response.probability); // กำหนดค่าความแม่นยำ
  };

  return (
    <section className='grid grid-rows-2 grid-flow-col '>
        <FileUpload onFileUpload={handleFileUpload} />
        <main className='grid grid-cols-2 my-5 gap-3'>
            <div className='p-5 text-black border rounded-2xl'>
                Result: {result}
            </div>
            <div className='p-5 text-black border rounded-2xl'>
                Accuracy: {accuracy}%
            </div>
        </main>
    </section>
  );
};

export default UploadProcess;

// import React, { useState } from 'react';
// import FileUpload from '../componant/upload_dragdrop';
// import axios from 'axios';
// import fs from 'fs'; // เพิ่ม import fs ที่นี่

// const UploadProcess: React.FC = () => {
//   const [result, setResult] = useState<string>('');
//   const [accuracy, setAccuracy] = useState<number>(0);

//   const handleFileUpload = (response: any) => {
//     setResult(response.predictions); // กำหนดค่าผลลัพธ์จากการทำนาย
//     setAccuracy(response.accuracy); // กำหนดค่าความแม่นยำ
//   };

//   const data = new FormData();
//   data.append('img_file'); // แก้เป็น fs.createReadStream

//   const config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://api-1-g4kp.onrender.com/predict',
//     headers: { 
//     },
//     data : data
//   };
  
//   axios.request(config)
//   .then((response) => {
//     handleFileUpload(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//   return (
//     <section className='grid grid-rows-2 grid-flow-col '>
//         <FileUpload onFileUpload={handleFileUpload} />
//         <main className='grid grid-cols-2 my-5 gap-3'>
//             <div className='p-5 text-black border rounded-2xl'>
//                 Result: {result}
//             </div>
//             <div className='p-5 text-black border rounded-2xl'>
//                 Accuracy: {accuracy}%
//             </div>
//         </main>
//     </section>
//   );
// };

// export default UploadProcess;

