
export default function About() {
    return (
        <section className="py-16 md:py-24 bg-white border-b border-stone-100" data-testid="about-section">
            <div className="container-app max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-8">The Kenya Challenge</h2>
                <div className="space-y-5 text-stone-600 text-base md:text-lg leading-relaxed">
                    <p>Walk, run, or jog from anywhere in the world. Track your steps through the app, follow your progress on a real map of Kenya, and watch your fundraising grow. The more you move, the more you raise.</p>
                    <p>This walk is more than a gathering; it is a visible statement that when a community moves together, lives change. Each step taken helps provide students with the resources, mentorship, and support they need to build brighter futures.</p>


                    {/* <p>Through the app, participants track their activity, follow fundraising progress, and engage directly with the real-world impact their efforts create, supporting students and transforming futures.</p>
                    <p>The platform also enables both individual and team fundraising, introducing a dynamic and friendly competitive element that drives higher participation and deeper engagement.</p>
                    <p>This walk is more than a gathering; it is a visible statement that when a community moves together, lives change. Each step taken helps provide students with the resources, mentorship, and support they need to build brighter futures.</p>
                    <p>Join us today and take part in a powerful experience that not only enriches your life but also changes the futures of many students in Kenya.</p> */}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-16 mb-8">What Can We Accomplish Together?</h2>
                <div className="space-y-5 text-stone-600 text-base md:text-lg leading-relaxed">
                    <p>In Kenya, 60% of families can’t afford secondary school fees. Your steps change that. The Kenya Challenge brings people together to raise vital funds for student scholarships, mentorship, and school resources.</p>

                    <p>Our finish line is a world where every child has a chance to learn. </p>
                    {/* <p>Don&apos;t forget to ask your friends, family, and colleagues to join you for this special day. We can&apos;t wait to see you at The Kenya Challenge.</p>
                    <p className="font-medium text-stone-700">Thank you so much for joining us!</p> */}
                </div>
            </div>
        </section>
    )
}
