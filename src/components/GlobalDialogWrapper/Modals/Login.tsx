import { DialogContent } from '@/components/Ui/Dialog'
import { openDialog } from '@/lib/store/slices/dialogSlice'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useDispatch } from 'react-redux'

function Login() {
    return (
        <DialogContent>
            <div onClick={() => signIn()} className='min-w-20'>Login karo bc</div>
        </DialogContent>
    )
}

export default Login