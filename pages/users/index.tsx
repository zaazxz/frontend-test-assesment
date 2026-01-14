import ComingSoon from '@/components/fragments/ComingSoon';
import { siteConfig } from '@/config/site';
import DefaultLayout from '@/layouts/default';
import React from 'react'

const UserIndex = () => {
    const config = siteConfig();

    return (
        <DefaultLayout title="User Management">
            <ComingSoon />
        </DefaultLayout>
    );
}

export default UserIndex