'use client'

import React, { useState, useEffect, MouseEvent } from 'react';
import MainChat from './chat';

type ResizeType = 'right' | 'top' | 'topRight';

export default function ShopChat() {
    const [dimensions, setDimensions] = useState({ height: 'calc(100vh - 7vh)', width: '100%' });
    const [minHeight, setMinHeight] = useState('50vh');  // Starting minimum height

    useEffect(() => {
        const handleResizeViewport = () => {
            const vh = window.innerHeight * 0.01;
            setMinHeight(`${50 * vh}px`);  // Adjust based on your needs
        };

        window.addEventListener('resize', handleResizeViewport);
        handleResizeViewport();  // Initial call

        return () => window.removeEventListener('resize', handleResizeViewport);
    }, []);

    const handleResize = (type: ResizeType) => (e: MouseEvent<HTMLDivElement>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(window.getComputedStyle(e.currentTarget.parentNode as HTMLElement).width, 10);
        const startHeight = parseInt(window.getComputedStyle(e.currentTarget.parentNode as HTMLElement).height, 10);

        const doResize = (e: MouseEvent) => {
            let newWidth = dimensions.width;
            let newHeight = dimensions.height;

            if (type === 'right' || type === 'topRight') {
                newWidth = `${Math.max(startWidth + (e.clientX - startX), 100)}px`;
            }
            if (type === 'top' || type === 'topRight') {
                newHeight = `${Math.max(startHeight - (e.clientY - startY), 100)}px`;
            }

            setDimensions({ width: newWidth, height: newHeight });
        };

        const stopResize = () => {
            window.removeEventListener('mousemove', doResize as any);
            window.removeEventListener('mouseup', stopResize);
        };

        window.addEventListener('mousemove', doResize as any);
        window.addEventListener('mouseup', stopResize);
    };

    return (
        <div style={{ ...dimensions, maxWidth: '600px', minWidth:'600px', minHeight:'800px',  maxHeight:'800px', position: 'fixed', bottom: '0', left: '0', borderRadius: '10px' }} className="bg-slate-700">
            <div className="resizer-top" style={{ width: '100%', height: '5px', cursor: 'n-resize', position: 'absolute', top: 0, backgroundColor: '#7480ff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} onMouseDown={handleResize('top')}></div>
            <div className="resizer-right" style={{ width: '5px', height: '100%', cursor: 'e-resize', position: 'absolute', right: 0, backgroundColor: '#7480ff', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }} onMouseDown={handleResize('right')}></div>
            <div className="resizer-top-right" style={{ width: '10px', height: '10px', cursor: 'ne-resize', position: 'absolute', right: 0, top: 0, backgroundColor: '#7480ff', borderTopRightRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)' }} onMouseDown={handleResize('topRight')}></div>
            <MainChat/>
        </div>
    );
}
