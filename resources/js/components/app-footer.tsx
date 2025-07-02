import { Icon } from '@iconify/react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { TypographyMuted } from './ui/typographyMuted';

export const AppFooter = () => {
    return (
        <footer className="fixed right-0 bottom-0 left-0 z-50 flex h-14 w-full items-center justify-between rounded-none border-sidebar bg-white px-4 md:static md:right-auto md:bottom-auto md:left-auto md:rounded-xl dark:border-sidebar-border dark:bg-neutral-900">
            <div className="flex-1" />

            <div className="relative mx-4 flex w-1/3 items-center gap-2">
                <TypographyMuted>50%</TypographyMuted>
                <Progress value={50} />
            </div>

            <div className="flex items-center gap-2">
                <Button variant={'outline'}>
                    <Icon icon="mingcute:notification-fill" width="24" height="24" />
                </Button>
                <Button variant={'outline'}>
                    <Icon icon="majesticons:chat" width="24" height="24" />{' '}
                </Button>
            </div>
        </footer>
    );
};
