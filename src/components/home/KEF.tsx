import Image from "next/image";

export default function KEF() {
  return (
    <section className="py-16 md:py-24" data-testid="why-kef-section">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-medium tracking-widest uppercase text-xs mb-3">
              Why KEF
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-6">
              100% of Every Donation Goes to Student Education
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              KEF empowers young people in Kenya by breaking barriers to
              education and creating real opportunities for success. We already
              helped 5000 children to come out of poverty, who otherwise will
              risk early marriage, child labor, and gender based violence.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              We believe in the power of youth, community, and action to
              transform futures and change lives. By investing in our students,
              we are investing in the leaders who will change the future.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our dream? A world where every child has the opportunity to go to
              school.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              What your support can do:
            </p>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">$250</p>
                <p className="text-xs text-stone-500">provides training</p>
                <p className="text-xs text-stone-500">for 1 student</p>
              </div>
              <div className="w-px h-12 bg-stone-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">$1,250</p>
                <p className="text-xs text-stone-500">support 1 child</p>
                <p className="text-xs text-stone-500">for 1 year of school</p>
              </div>
              <div className="w-px h-12 bg-stone-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">$5,000</p>
                <p className="text-xs text-stone-500">support 1 child</p>
                <p className="text-xs text-stone-500">for 4 years of school</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src={"/images/one-student.jpg"}
              alt="Kenyan students"
              className="rounded-2xl object-cover w-full h-100 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
