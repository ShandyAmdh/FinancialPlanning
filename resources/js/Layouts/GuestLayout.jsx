import ThemeSwitcher from '@/Components/Dark/ThemeSwitcher';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ title, children }) {
    return (
        <>
            <Head title={title ? title.charAt(0).toUpperCase() + title.slice(1) + ' - CuanPlanner' : 'CuanPlanner'} />
            <div className="flex min-h-svh flex-col items-center justify-center bg-slate-100 p-6 dark:bg-background md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
                <div className="fixed bottom-5 end-5 flex w-full justify-center lg:justify-end">
                    <ThemeSwitcher />
                </div>
            </div>
        </>
    );
}
