import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, usePage } from '@inertiajs/react';
import { IconCheck } from '@tabler/icons-react';

export default function UpdatePasswordForm() {
    const { flash_message } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('process-change-password'), {
            onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Ganti Password</CardTitle>
                    <CardDescription>Pastikan akun menggunakan password yang kuat dan aman.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* ✅ Flash Messages */}
                    {flash_message?.status && (
                        <div className="mb-4 items-center justify-center gap-2 text-sm font-medium text-green-600">
                            {flash_message.status}
                        </div>
                    )}
                    {flash_message?.error && (
                        <div className="mb-4 flex text-sm font-medium text-red-600">{flash_message.error}</div>
                    )}
                    <form onSubmit={submit} className="space-y-6" method="POST">
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="current_password" value="Password Lama" />
                            <TextInput
                                id="current_password"
                                type="password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                            />
                            <InputError message={errors.current_password} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="password" value="Password Baru" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password Baru" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" variant="emerald" size="xl" disabled={processing}>
                            <IconCheck />
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
UpdatePasswordForm.layout = (page) => <AppLayout title="Ganti Password" children={page} />;
