import { CircleCheckBig, Lock } from 'lucide-react';
import SessionLogout from './SessionLogout';

const page = async () => (
    <div className="relative flex xs:items-center justify-center p-0 xs:p-16 min-h-screen h-full">

        <div className="flex flex-col items-center justify-center gap-8 xs:gap-10 xs:max-w-lg w-full p-5 xs:p-8 xs:border xs:border-blueLight shadow bg-white rounded z-10">
            <SessionLogout />

            <div className='flex flex-col justify-between sm:flex-row gap-5 w-fit'>
                <div className="flex items-center justify-center gap-3 bg-blueLight/30 border border-blueMedium/10 py-3 px-5 rounded-md">
                    <CircleCheckBig className="size-5 text-success" />
                    <span className="text-label text-neutral">Session Secured</span>
                </div>

                <div className="flex items-center justify-center gap-3 bg-blueLight/30 border border-blueMedium/10 py-3 px-5 rounded-md">
                    <Lock className="size-5 text-blueMedium" />
                    <span className="text-label text-neutral">Data Protected</span>
                </div>
            </div>
        </div>
    </div>
);

export default page;