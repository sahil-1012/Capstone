"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Loader2 } from 'lucide-react';
import { handleClearCookies } from '@/utils/cookie';

const SessionLogout = () => {
    const searchParams = useSearchParams()
    const isSessionExpired = searchParams.get('session') === 'expired';

    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const totalDuration = 3000;
    const countdown = Math.ceil((1 - progress / 100) * (totalDuration / 1000));

    const handleManualLogout = () => router.push(`/login`);

    useEffect(() => {
        const interval = setInterval(() => setProgress(prev => prev >= 100
            ? (clearInterval(interval), handleManualLogout(), 100)
            : prev + (100 / (totalDuration / 30))),
            30);

        const clearSessionData = async () => {
            await Promise.all([handleClearCookies()]);
            sessionStorage.clear();
        };

        clearSessionData();
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <React.Fragment>
            <div className='flex flex-col items-center text-center gap-1'>
                <span className='text-regular text-light max-w-96'>
                    Your work is being securely saved, and your session is now being safely ended.
                </span>
            </div>

            <div className="flex flex-col items-center gap-5">
                <div className='flex flex-col items-center gap-3'>
                    <span className='flex items-center gap-1 text-regular text-light'>
                        <Loader2 className='size-4 animate-spin' />
                        {isSessionExpired ? `Redirecting you in ${countdown} sec...` : `Logging you out in ${countdown} sec...`}
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SessionLogout