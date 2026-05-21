import { Footprints, Heart, Mountain, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const steps = [
    { step: '01', title: 'Sign Up', desc: 'Create your account and pick your registration level to get started.', icon: Users },
    { step: '02', title: 'Choose How to Participate', desc: 'Walk anywhere, anytime as a solo or with a team - join an existing team or create your own', icon: Mountain },
    { step: '03', title: 'Start Your Challenge', desc: 'Walk, jog or run, track your steps, watch your progress, and connect with others. ', icon: Footprints },
    { step: '04', title: 'Fundraise', desc: 'Share your page, invite friends and family, get supporters, and change lives.', icon: Heart },
]
export default function HowItWorks() {
    return (
        <section className="py-16 md:py-24" data-testid="how-it-works-section">
            <div className="container-app">
                <p className="text-orange-600 font-medium tracking-widest uppercase text-xs text-center mb-3">How It Works</p>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 text-center mb-12">
                    Four Steps to Make a Difference
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((item) => (
                        <Card key={item.step} className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
                            <CardContent className="p-6 md:p-8">
                                <span className="text-4xl font-bold text-primary-100/10">{item.step}</span>
                                <div className="w-10 h-10 rounded-xl bg-primary-50/10 flex items-center justify-center mt-3 mb-3">
                                    <item.icon className="w-5 h-5 text-primary-500" />
                                </div>
                                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
