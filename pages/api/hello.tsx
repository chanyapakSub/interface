// pages/api/hello.tsx
import { NextApiRequest, NextApiResponse } from 'next';

export default function HelloApi(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello, world!' });
}
