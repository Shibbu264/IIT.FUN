import { DialogContent } from '@/components/Ui/Dialog';
import { Input } from '@/components/Ui/input';
import { Button } from '@/components/Ui/Button';
import React, { useState } from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import { useMutation } from '@tanstack/react-query';

export default function RSVPModal({ id }: { id: string }) {
  const [code, setCode] = useState('');

  const mutation = useMutation({
    mutationFn: (code: string) => axiosInstance.post("/attendance-community-call", { id: id, code: code }),
  });

  const handleSubmit = () => {
    mutation.mutate(code);
  };

  return (
    <DialogContent className="md:w-md !w-screen bg-gray-900 max-md:max-w-[90%] text-white p-6 rounded-xl">
      {mutation.isSuccess ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">GG, Attendance Locked! <Lock className="inline" />🔥</h2>
          <p className="mt-2">You're officially on the list, degen. <CheckCircle className="inline text-green-500" /></p>
          <p className="text-sm text-gray-400">Stay based, stay bullish. See ya in the next one. 👀💎</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          <h2 className="md:text-2xl text-xl font-bold">Wen Attendance? NOW. 🚀</h2>
          <p className="mt-2">Ayy, you made it through the community call—LEGEND. 🎉</p>
          <p className="mt-1">Now, lock in your attendance by dropping the shared code below. 🔑</p>
          <Input
            className={`!min-h-[30px] !py-4 w-fit min-w-[250px] ${mutation.isError ? 'border-red-500' : 'border-secondaryGray'}`}
            type="text"
            placeholder={mutation.isError ? 'Enter the correct attendance code.' : 'Enter the attendance code'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={mutation.isPending}
          />
          <Button
            size={"lg"}
            variant="secondary"
            className="w-full"
            onClick={handleSubmit}
            loading={mutation.isPending}
          >
            {'Submit'}
          </Button>
          {mutation.isError && <p className="text-red-500 text-sm">Invalid code, try again.</p>}
        </div>
      )}
    </DialogContent>
  );
}
