import { TSponsor } from '@/app/page'
import { Building2 } from 'lucide-react'
import Image from 'next/image'

export default function OurPartners({ sponsors }: { sponsors: TSponsor[] }) {

    // Group sponsors by sponsorship_level
    const groupedSponsors = sponsors.reduce((acc, sponsor) => {
        const level = sponsor.sponsorship_level || 'Other'

        if (!acc[level]) {
            acc[level] = []
        }

        acc[level].push(sponsor)

        return acc
    }, {} as Record<string, TSponsor[]>)

    return (
        <section
            className="py-16 md:py-20 bg-stone-50"
            data-testid="sponsors-section"
        >
            <div className="container-app">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Building2 className="w-5 h-5 text-orange-600" />
                        <span className="text-orange-600 font-medium text-sm tracking-wider uppercase">
                            Our Partners
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                        Thank You to Our Sponsors
                    </h2>

                    <p className="text-stone-500 mt-2 max-w-xl mx-auto">
                        The Kenya Challenge is made possible by these generous organizations.
                    </p>
                </div>

                <div>
                    {Object.entries(groupedSponsors).map(([level, sponsors], idx) => (
                        <div
                            key={level}
                            className={`text-center ${idx > 0 ? 'mt-12' : ''}`}
                            data-testid={`sponsor-level-${level}`}
                        >
                            <h3 className="text-lg font-bold text-stone-800 inline-block border-b-2 border-orange-300 pb-1">
                                {level}
                            </h3>

                            {/* Grid of logos */}
                            <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
                                {sponsors.map((sponsor) => (
                                    <a
                                        key={sponsor.id}
                                        href={sponsor.url || '#'}
                                        target={sponsor.url ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        className="group"
                                        data-testid={`sponsor-${sponsor.id}`}
                                    >
                                        {sponsor.logo ? (
                                            <div className="w-32 h-20 md:w-40 md:h-24 bg-white rounded-xl shadow-sm border border-stone-100 p-3 flex items-center justify-center transition-all group-hover:shadow-md group-hover:scale-105">
                                                <Image
                                                    src={
                                                        process.env.NEXT_PUBLIC_BASE_URL +
                                                        sponsor.logo
                                                    }
                                                    alt={sponsor.name}
                                                    className="max-w-full max-h-full object-contain"
                                                    width={120}
                                                    height={120}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-32 h-20 md:w-40 md:h-24 bg-white rounded-xl shadow-sm border border-stone-100 p-3 flex items-center justify-center transition-all group-hover:shadow-md group-hover:scale-105">
                                                <span className="text-sm font-medium text-stone-700 text-center">
                                                    {sponsor.name}
                                                </span>
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}