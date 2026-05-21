"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RefreshCw, Smartphone, Unlink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    user: {
        google_fit_connected?: boolean;
        google_fit_email?: string;
    } | null;
}

export default function GoogleFitCard({
    user
}: Props) {
    const [disconnecting, setDisconnecting] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const handleSyncSteps = async () => {
        setSyncing(true);
        try {
            
        } catch (err: unknown) {
            toast.error((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to sync steps');
        } finally {
            setSyncing(false);
        }
    };

    const handleDisconnect = async () => {
        if (!window.confirm('Disconnect Google Fit? You can reconnect later.')) return;
        setDisconnecting(true);
        try {
            // await api.delete('/fitness/disconnect');
            // toast.success('Google Fit disconnected');
            // fetchUser();
        } catch (err: unknown) {
            toast.error((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to disconnect');
        } finally {
            setDisconnecting(false);
        }
    };

    const handleConnectGoogleFit = async () => {
        try {
            // const res = await api.get('/fitness/connect');
            // window.location.href = res.data.authorization_url;
        } catch (err: unknown) {
            toast.error((err as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to connect');
        }
    };

    return (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100" data-testid="google-fit-card">
            <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-900">Google Fit</h3>
                        <p className="text-xs text-stone-500">Sync steps from your phone</p>
                    </div>
                </div>

                {user?.google_fit_connected ? (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Connected</span>
                            {user.google_fit_email && (
                                <span className="text-xs text-stone-400">({user.google_fit_email})</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleSyncSteps}
                                disabled={syncing}
                                className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white h-10"
                                data-testid="sync-steps-btn"
                            >
                                <RefreshCw className={`w-4 h-4 mr-1 ${syncing ? 'animate-spin' : ''}`} />
                                {syncing ? 'Syncing...' : 'Sync Steps'}
                            </Button>
                            <Button
                                onClick={handleDisconnect}
                                disabled={disconnecting}
                                variant="outline"
                                className="rounded-xl border-stone-200 text-stone-500 h-10"
                                data-testid="disconnect-fit-btn"
                            >
                                <Unlink className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        onClick={handleConnectGoogleFit}
                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white h-10"
                        data-testid="connect-google-fit-btn"
                    >
                        <Smartphone className="w-4 h-4 mr-2" /> Connect Google Fit
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}