import { Button } from '@/components/Ui/Button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/Ui/Dialog';
import axiosInstance from '@/lib/axiosInstances/iitFunInstance';
import React from 'react';
import { FaDiscord } from "react-icons/fa";
import { useAppSelector } from '@/lib/store/store';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@/lib/store/slices/dialogSlice';
import { Handshake, Twitter, Github, SendIcon, ExternalLink, Check } from 'lucide-react';
import { setUser } from '@/lib/store/slices/userSlice';
import { connectDiscord, connectTwitter } from '@/lib/services/socialConnect';
import { Card, CardContent } from '@/components/Ui/Card';

export default function ShowSocials({ prompts }: { prompts: any[] }) {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useDispatch();

  const generateSocialLinks = () => {
    const socialLinks: { 
      title: string; 
      link: string; 
      icon: React.ReactNode;
      color: string;
      connected?: boolean;
    }[] = [];
    
    prompts.forEach((prompt) => {
      switch (prompt.title) {
        case 'discord':
          socialLinks.push({ 
            title: 'Discord', 
            link: 'https://discord.com/channels/1022510020736331806/1022611302310477834',
            icon: <FaDiscord className="h-6 w-6" />,
            color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
            connected:prompt.connected
          });
          break;
        case 'twitter':
          socialLinks.push({ 
            title: 'Twitter', 
            link: 'https://x.com/iit_fun',
            icon: <Twitter className="h-6 w-6" />,
            color: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
            connected:prompt.connected
          });
          break;
        case 'telegram':
          socialLinks.push({ 
            title: 'Telegram', 
            link: 'https://t.me/iit_fun',
            icon: <SendIcon className="h-6 w-6" />,
            color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
            connected:prompt.connected
          });
          break;
        default:
          break;
      }
    });
    return socialLinks;
  };


  const socialLinks = generateSocialLinks();

  return (
    <DialogContent className="md:max-w-md !w-screen bg-gray max-md:!border-none  max-md:!min-h-[90vh] max-md:!min-h-[90dvh] p-6 rounded-xl">
      <DialogHeader className="text-center">
        <div className="mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 p-4 rounded-full mb-4">
          <Handshake className="h-12 w-12 text-indigo-600" />
        </div>
        <DialogTitle className="text-center font-bold !text-2xl ">Join Our Community!</DialogTitle>
        <DialogDescription className="text-center mt-2">
          Connect with us on social media to stay updated and be part of our growing community.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 mt-4">
        {socialLinks.map((social, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className={`p-2 rounded-full mr-4 ${social.color.split(' ').slice(0, 2).join(' ')}`}>
                  {social.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{social.title}</h3>
                  <p className="text-sm max-w-[128px] line-clamp-2 text-gray-500">{social.link}</p>
                </div>
                <div className="flex space-x-2">
                  {social?.connected?
                  <span className='flex gap-2 items-center text-primaryGreen'><span>Joined</span>
                  <Check/>
                  </span>

                  :
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(social.link, '_blank')}
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit
                  </Button>
}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DialogContent>
  );
}