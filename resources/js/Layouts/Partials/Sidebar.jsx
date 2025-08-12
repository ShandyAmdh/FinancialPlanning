import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent } from '@/Components/ui/card';
import {
    IconAlt,
    IconBox,
    IconCalendarEvent,
    IconChartArrowsVertical,
    IconCreditCardPay,
    IconDoorEnter,
    IconDoorExit,
    IconLogout2,
    IconLogs,
    IconMenorah,
    IconMoneybag,
} from '@tabler/icons-react';

import { usePage } from '@inertiajs/react';

export default function Sidebar({ auth: propsAuth, url }) {
    // Ambil auth dari props jika ada, jika tidak ambil dari usePage
    const page = usePage();
    const auth = propsAuth && Object.keys(propsAuth).length > 0 ? propsAuth : page.props.auth || {};
    const user = auth && auth.user ? auth.user : {};
    return (
        <nav className="flex flex-1 flex-col gap-y-6">
            {/* Aplikasi logo */}
            <ApplicationLogo url="#" />
            {/* Card untuk nama user foto dan kode has user */}
            <Card>
                <CardContent className="flex items-center gap-x-3 p-3">
                    <Avatar>
                        <AvatarImage src={user.avatar || ''} />
                        <AvatarFallback>{(user.name && user.name.substring(0, 1)) || '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        {/* line-clam itu artinya hanya sebaris saja jika lebih maka akan .... */}
                        <span className="line-clamp-1 text-sm font-medium leading-relaxed tracking-tighter">
                            {user.name || 'User'}
                        </span>

                        <span className="line-clamp-1 text-xs font-light">{user.id || ''}</span>
                    </div>
                </CardContent>
            </Card>
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
                <div className="px-3 py-2 font-medium text-muted-foreground">General</div>
                <NavLink
                    url={route('dashboard')}
                    active={url.startsWith('/dashboard')}
                    title="Dashboard"
                    icon={IconBox}
                />

                <NavLink
                    url={route('saran.keuangan')}
                    active={url.startsWith('/saran-keuangan')}
                    title="Saran Keuangan"
                    icon={IconAlt}
                />

                <div className="px-3 py-2 font-medium text-muted-foreground">Master</div>
                <NavLink
                    url={route('payments.index')}
                    active={url.startsWith('/payments')}
                    title="Metode Pembayaran"
                    icon={IconCreditCardPay}
                />
                <div className="px-3 py-2 font-medium text-muted-foreground">Rencana</div>

                <NavLink
                    url={route('goals.index')}
                    active={url.startsWith('/goals')}
                    title="Tujuan"
                    icon={IconMoneybag}
                />

                <div className="px-3 py-2 font-medium text-muted-foreground">Pelacakan</div>
                <NavLink
                    url={route('budgets.index')}
                    active={url.startsWith('/budgets')}
                    title="Anggaran"
                    icon={IconChartArrowsVertical}
                />

                <NavLink
                    url={route('incomes.index')}
                    active={url.startsWith('/incomes')}
                    title="Pemasukan"
                    icon={IconDoorEnter}
                />

                <NavLink
                    url={route('expenses.index')}
                    active={url.startsWith('/expenses')}
                    title="Pengeluaran"
                    icon={IconDoorExit}
                />

                <div className="px-3 py-2 font-medium text-muted-foreground">Aset dan Kewajiban</div>

                <NavLink
                    url={route('net-worths.index')}
                    active={url.startsWith('/net-worths')}
                    title="Kekayaan Bersih"
                    icon={IconMenorah}
                />

                <div className="px-3 py-2 font-medium text-muted-foreground">Laporan</div>

                <NavLink
                    url={route('report-trackings')}
                    active={url.startsWith('/report-trackings')}
                    title="Laporan Pelacakan"
                    icon={IconLogs}
                />

                <NavLink
                    url={route('annual-reports')}
                    active={url.startsWith('/annual-reports')}
                    title="Laporan Tahunan"
                    icon={IconCalendarEvent}
                />
                <div className="px-3 py-2 font-medium text-muted-foreground">Lainnya</div>
                <NavLink
                    as="button"
                    method="post"
                    url={route('logout')}
                    active={url.startsWith('/logout')}
                    title="Logout"
                    icon={IconLogout2}
                    className="w-full"
                />
            </ul>
        </nav>
    );
}
