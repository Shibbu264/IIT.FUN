import { Button } from '@/components/Ui/Button'
import { Card, CardContent } from '@/components/Ui/Card'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/Ui/Dialog'
import { ExternalLink, Send } from 'lucide-react'
import React from 'react'
import { FaTelegram } from 'react-icons/fa'

export default function JoinTelegram() {
    return (
        <DialogContent className="max-w-md p-6 rounded-xl">
            <DialogHeader className="text-center">
                <div className="mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-full mb-4">
                    <FaTelegram className="h-12 w-12 text-indigo-600" />
                </div>
                <DialogTitle className="text-center font-bold !text-2xl ">Join Our Community!</DialogTitle>
                <DialogDescription className="text-center !text-lg mt-2">
                    Join <span className='text-primaryGreen'>IIT.FUN </span> channel and verify your membership in our <span className='text-lg text-primaryGreen'>verify-members</span> group by sending
                     <span className='text-primaryGreen text-xl block'>{"/verify your_iit.fun_username"}</span>
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
                <Card className="overflow-hidden border-0 shadow-sm">
                    <CardContent className="p-0">
                        <div className="flex items-center p-4">
                            <div className={`p-2 rounded-full mr-4`}>
                                <Send />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium">{"Telegram"}</h3>
                                <p className="text-sm max-w-[128px] line-clamp-2 text-gray-500">{"https://t.me/iit_fun"}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open("https://t.me/iit_fun", '_blank')}
                                    className="bg-gray-100 hover:bg-gray-200"
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Join
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Button className='w-full' onClick={()=>window.location.reload()}>Done</Button>
            </div>
        </DialogContent>
    )
}
