"use client";

import PickChallenge from '@/components/dashboard/walker-dashboard/PickChallange';
import InvitedSupporters from '@/components/dashboard/walker-support/InvitedSupporters';
import Supporters from '@/components/dashboard/walker-support/Supporters';
import WalkerInvite from '@/components/dashboard/walker-support/WalkerInvite';
import Loader from '@/components/shared/Loader';
import useAuth from '@/hook/useAuth';
import { useSupport } from '@/hook/useSupport';
import { TSponsor } from '@/types/walker-support';
import { useEffect, useState } from 'react';

export default function SupportersPage() {
    const { data } = useSupport();
    const { user } = useAuth();
    // console.log(user)
    const [sponsors] = useState<TSponsor[]>([
        {
            id: "s1",
            name: "Rahim Uddin",
            amount: 25,
            message: "Great initiative—keep walking!",
        },
        {
            id: "s2",
            name: "Nusrat Jahan",
            amount: 50,
            message: "Proud of your consistency!",
        },
        {
            id: "s3",
            name: "Tanvir Hasan",
            amount: 15,
        },
        {
            id: "s4",
            name: "Farzana Akter",
            amount: 100,
            message: "Amazing effort for a good cause!",
        },
        {
            id: "s5",
            name: "Mahmudul Islam",
            amount: 10,
            message: "Every step counts!",
        },
        {
            id: "s6",
            name: "Ayesha Rahman",
            amount: 75,
        },
        {
            id: "s7",
            name: "Shakib Ahmed",
            amount: 40,
            message: "Keep pushing forward!",
        },
    ]);
    
    // console.log(data)
    const [loading, setLoading] = useState<boolean>(true);


    const loadData = async (): Promise<void> => {
        try {
            // const [s, i] = await Promise.all([
            //     api.get<Sponsor[]>(`/sponsors/${user.id}`),
            //     api.get<Invite[]>('/supporter-invites'),
            // ]);

            // setSponsors(s.data);
            // setInvites(i.data);
        } catch {
            // silent fail
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    // if (!data || !user?.is_onbording) return <div className="container-app py-8 md:py-12" ><PickChallenge /> </div>;

    return (
        <div className='container-app py-8 md:py-12'>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">Your Supporters</h1>
            <p className="text-stone-500 mb-8">Invite friends and family to support your challenge with pledges.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Invite + Link */}
                <WalkerInvite raised={data?.raised || 0} totalSupporter={data?.totalSupporter || 0} challenge={user?.registrations?.challenge_id} />

                {/* Right: Lists */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Supporters who donated */}
                    {/* <Supporters sponsors={sponsors} /> */}

                    {/* Invited supporters */}
                    <InvitedSupporters invitedMembers={data?.supporter || []} />
                </div>
            </div>
        </div>
    );
}