import { siteConfig } from '@/config/site';

import ComingSoon from '@/components/fragments/ComingSoon';
import DefaultLayout from '@/layouts/default';
import React from 'react';

const MonitorPage = () => {

    const config = siteConfig();

    return (
        <DefaultLayout title="Monitor">
            <ComingSoon />
        </DefaultLayout>
    );
}

export default MonitorPage