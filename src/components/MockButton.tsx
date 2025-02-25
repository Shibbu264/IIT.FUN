import { openDialog } from '@/lib/store/slices/dialogSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from './Ui/Button'

export default function MockButton() {
    const dispatch = useDispatch()
    return (
        <Button className='absolute bottom-4 right-4' onClick={() => {
            dispatch(openDialog(
                {
                    type: "login"
                }
            ))
        }}>hiii</Button>
    )
}
