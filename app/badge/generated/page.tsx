"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from "react"

import { CustomSVG } from '@/components/index'

export default function GeneratedPage() {
    return (
        <Suspense>
            <PageContent />
        </Suspense>
    )
}

function PageContent() {
    const searchParams = useSearchParams()

    const [params, setParams] = useState<Record<string, string>>({
        text: '',
        svgName: '',
        backgroundColor: '000000',
        textColor: 'ffffff',
        iconColor: 'ffffff'
    })

    useEffect(() => {
        const text = searchParams.get('text') || ''
        const svgName = searchParams.get('svgName') || ''
        const backgroundColor = searchParams.get('backgroundColor') || '000000'
        const textColor = searchParams.get('textColor') || 'ffffff'
        const iconColor = searchParams.get('iconColor') || 'ffffff'

        setParams({ text, svgName, backgroundColor, textColor, iconColor })
    }, [searchParams])

    return (
        <main>
            <div style={{ backgroundColor: `#${params.backgroundColor}` }} className="w-[126.5px] h-[28px] flex items-center pl-2">
                {params.svgName && <CustomSVG svgName={params.svgName} backgroundColor={params.backgroundColor} iconColor={params.iconColor} />}
                {params.text && <label style={{ color: `#${params.textColor}` }} className="ml-3 uppercase font-bold text-xs tracking-widest">{params.text}</label>}
            </div>
        </main>
    );
}