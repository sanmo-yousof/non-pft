import { Building2 } from 'lucide-react'

export default function BecomeSponsor() {
    return (
        <section className="py-16 md:py-20 bg-[#1a3660]" data-testid="become-sponsor-section">
            <div className="container-app">
                <div className="max-w-2xl mx-auto text-center">
                    <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Become a Sponsor
                    </h2>
                    <p className="text-stone-300 leading-relaxed">
                        Partner with The Kenya Challenge and make a lasting impact on education in Kenya.
                        Your sponsorship helps students achieve their dreams. Please contact{' '}
                        <a href="mailto:sabrina@kenyaeducationfund.org" className="text-primary hover:text-primary-600 underline">
                            sabrina@kenyaeducationfund.org
                        </a>.
                    </p>
                </div>
            </div>
        </section>
    )
}
