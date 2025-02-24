import { DialogContent } from '@/components/Ui/Dialog'
import { openDialog } from '@/lib/store/slices/dialogSlice'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useDispatch } from 'react-redux'

function Login() {
    const dispatch=useDispatch()
    return (
        <div onClick={()=>signIn()} className='min-w-20'>Login karo bc</div>
    )
}

export default Login