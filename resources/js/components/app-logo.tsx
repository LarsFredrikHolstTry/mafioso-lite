import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon />
            </div>
            <div className="ml-1 flex flex-1 flex-row items-center gap-2 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Mafioso</span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                    LITE
                </span>
            </div>
        </>
    );
}
