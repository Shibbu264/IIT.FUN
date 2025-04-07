import { Button } from '@/components/Ui/Button';
import { DialogContent } from '@/components/Ui/Dialog';
import { Input } from '@/components/Ui/input';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/store/store';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@/lib/store/slices/dialogSlice';
import { Handshake, Smile, SmilePlusIcon } from 'lucide-react';
import { setUser } from '@/lib/store/slices/userSlice';

export default function AddUsername({ closable = true,username:usernamee,type="add" }: { closable: boolean,username?:string,type?:"add"|"edit" }) {
    const [username, setUsername] = useState(usernamee??"");
    const user=useAppSelector(state=>state.user.user);
    const dispatch=useDispatch();
    

    const  updateUsernameMutation = useMutation({
        mutationFn:()=>axiosInstance.post("/api/update-user", {
            userId:user?.id,
            newUsername:username,
        }),
        onSuccess: (response:any) => {
          dispatch(closeDialog())
          dispatch(setUser(response.data.user))
        },
        onError: (error: any) => {
            // Handle error
        },
    });

    return (
        <DialogContent className='max-w-72 flex flex-col items-center' closable={closable}>
            <SmilePlusIcon className="h-24 w-24" />
            {type=="add" && <h1 className='text-lg'>Hey Degen, Let's Add your username first!</h1>}
            <Input className='!h-12 !text-xl' placeholder='BountyHunter69' value={username} onChange={(e) => setUsername(e.target.value.split(' ').join(''))} type='text' />
            <Button loading={updateUsernameMutation.isPending} className='w-full' size="lg" onClick={()=>updateUsernameMutation.mutate()}>{type=="edit"?"Update":"Add"} Username</Button>
        </DialogContent>
    );
}
