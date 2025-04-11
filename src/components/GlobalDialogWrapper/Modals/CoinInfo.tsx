import { DialogContent } from '@/components/Ui/Dialog';
import { CoinsIcon } from 'lucide-react';
import { useAppSelector } from '@/lib/store/store';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/store/slices/userSlice';

export default function CoinInfo() {
    const user = useAppSelector(state => state.user.user);
    const dispatch = useDispatch();

    return (
        <DialogContent className="max-w-72 md:max-w-md flex flex-col items-center text-center gap-4">
            <CoinsIcon className="text-yellow-400 animate-spin w-24 h-24" />

            <h2 className="font-semibold md:text-3xl text-xl text-yellow-500">Why Coins Matter</h2>

            <ul className="list-disc list-inside text-left md:text-xl text-lg text-gray-700 space-y-3">
                <li>Boost your rank on the Dropout Meter .</li>
                <li>Earn airdrops by collecting more coins .</li>
                <li>Gain coins by joining community calls and contributing to <span className='text-primaryGreen'>iit.fun</span> .</li>
                <li>Sign in daily to earn 20 coins automatically .</li>
            </ul>
        </DialogContent>
    );
}
