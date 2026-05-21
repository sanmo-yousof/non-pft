import { GraduationCap, Heart, MapPin, Trophy } from 'lucide-react'
import Image from 'next/image'

const stats = [
    { num: '4,800+', label: 'Scholarships Provided', icon: GraduationCap },
    { num: '650', label: 'Active Scholarships', icon: Heart },
    { num: '153', label: 'Partner Schools', icon: MapPin },
    { num: '99%', label: 'Transition Rate', icon: Trophy },
]

export default function ImpactStats() {
    return (
        <section className="py-16 md:py-20 bg-white border-b border-stone-100" data-testid="impact-section">
            <div className="container-app">
                <div className="flex justify-center mb-8">
                    <Image src="/images/kef25logo.jpg" alt="KEF 25 Years" className="h-24 md:h-32 object-contain" width={1920} height={1080} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="w-12 h-12 rounded-2xl bg-primary-50/10 flex items-center justify-center mx-auto mb-3">
                                <stat.icon className="w-6 h-6 text-primary-500" />
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-stone-900">{stat.num}</p>
                            <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
