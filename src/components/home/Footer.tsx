
export default function Footer() {
    return (
        <footer className="py-8 bg-stone-900 border-t border-stone-800">
            <div className="container-app text-center space-y-3">
                <p className="text-stone-500 text-sm">
                    The Kenya Challenge is a fundraising initiative of the{' '}
                    <a href="https://www.kenyaeducationfund.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600">
                        Kenya Education Fund
                    </a>
                </p>
                <p className="text-stone-500 text-sm">
                    For any questions regarding the walk or the app, please contact Monsheila at{' '}
                    <a href="mailto:monsheila@kenyaeducationfund.org" className="text-primary hover:text-primary-600">monsheila@kenyaeducationfund.org</a>.
                </p>
            </div>
        </footer>
    )
}
