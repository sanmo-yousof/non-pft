"use client";

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ActivityForm from '@/components/dashboard/walker-activities/ActivityForm';
import ActivityHistory from '@/components/dashboard/walker-activities/ActivityHistory';
import GoogleFitCard from '@/components/dashboard/walker-activities/GoogleFitCard';
import RouteProgressCard from '@/components/dashboard/walker-activities/RouteProgress';
import { useActivities } from '@/hook/useActivity';
import { useSearchParams } from 'next/navigation';
import useAuth from '@/hook/useAuth';
import PickChallenge from '@/components/dashboard/walker-dashboard/PickChallange';


export default function ActivityPage() {
    const { user } = useAuth();
    const searchParams = useSearchParams();


    // Google Fit state
    const [fitnessStatus] = useState({ configured: false });

    const loadData = () => {
        // Promise.all([
        //     api.get('/activities'),
        //     api.get('/users/progress'),
        //     api.get('/fitness/status').catch(() => ({ data: { configured: false } }))
        // ])
        //     .then(([a, p, f]) => {
        //         setActivities(a.data);
        //         setProgress(p.data);
        //         setFitnessStatus(f.data);
        //     })
        //     .catch(() => { });
    };

    useEffect(() => {
        loadData();
        // Check for fitness connection callback
        if (searchParams.get('fitness_connected') === 'true') {
            toast.success('Google Fit connected successfully!');
            // fetchUser();
        } else if (searchParams.get('fitness_error') === 'true') {
            toast.error('Failed to connect Google Fit');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);


    const { data } = useActivities();

    

    return (
        <div data-testid="activity-page" className='container-app py-8 md:py-12'>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">Log Your Activity</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Add Activity + Google Fit + Route Progress */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Google Fit Integration */}
                    {fitnessStatus.configured && (
                        <GoogleFitCard user={user || {}} />
                    )}

                    {/* Add Activity Form */}
                    <ActivityForm challangeId={data?.challenge?.id || 0} />

                    {/* Route Progress Mini */}
                    <RouteProgressCard total_distance={data?.challenge?.total_distance||0} progress={data?.progress || null} />
                </div>

                {/* Right: Activity History */}
                <ActivityHistory activities={data?.activities || []} />
            </div>
        </div>
    );
}
