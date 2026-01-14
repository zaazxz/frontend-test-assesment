import { siteConfig } from '@/config/site';

import ComingSoon from '@/components/fragments/ComingSoon';
import DefaultLayout from '@/layouts/default';
import React from 'react';

const DesignIndex = () => {
    const config = siteConfig();

    return (
        <DefaultLayout title="Design">
            <ComingSoon />
        </DefaultLayout>
    );
}

export default DesignIndex