import React from 'react';
import {Banner} from '@/components/common';
import BannerMessage from './bannerMessage';

export default function BannersList({
    bannerQueue,
    dismissBanner,
    resetHighlightedCourses,
    isEditMode
}) {
    const handleCloseBanner = (index, id) => {
        setTimeout(() => {
            resetHighlightedCourses();
        }, 0);
        dismissBanner(index, id);
    };
    return (
        <>
            {bannerQueue.map((banner, index) => (
                <Banner
                    key={`banner_${index}`}
                    type={banner.type}
                    title={banner.title}
                    onClose={() => handleCloseBanner(index, banner.id)}
                    isClosable={banner.isClosable}
                    onResolve={banner.onResolve}
                    onClick={banner.onClick}
                    isEditMode={isEditMode}
                >
                    {banner.reason && (
                        <BannerMessage
                            reason={banner.reason}
                            data={banner.data}
                        />
                    )}
                </Banner>
            ))}
        </>
    );
}
