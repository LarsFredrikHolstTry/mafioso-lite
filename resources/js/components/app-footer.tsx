export const AppFooter = () => {
    return (
        <footer className="fixed right-0 bottom-0 left-0 z-50 flex h-14 w-full items-center justify-between rounded-none border-sidebar bg-white px-4 md:static md:right-auto md:bottom-auto md:left-auto md:rounded-xl dark:border-sidebar-border dark:bg-neutral-900">
            <div className="flex-1" />

            <div className="relative mx-4 flex w-1/3 items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-300">50%</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="animate-progress h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button type="button" className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <button type="button" className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Messages">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                </button>
            </div>
        </footer>
    );
};
