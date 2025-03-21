"use client"
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"
export default function GeneratedPage() {
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
}