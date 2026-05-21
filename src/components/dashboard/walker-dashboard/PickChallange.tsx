import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Mountain } from 'lucide-react'
import Link from 'next/link'

export default function PickChallenge() {
    return (
        <Card className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <CardContent className="p-8 text-center">
                <Mountain className="w-12 h-12 text-primary-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-stone-900 mb-2">Pick Your Challenge</h2>
                <p className="text-stone-500 mb-6 max-w-md mx-auto">
                    Choose a virtual Kenyan route and registration level to begin your walking journey.
                </p>
                <Link href="/onboarding">
                    <Button className="rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-6 h-auto" data-testid="dashboard-pick-challenge-btn">
                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}
