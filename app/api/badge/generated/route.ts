import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)

    const text = url.searchParams.get('text') || 'TypeScript'
    const svgName = url.searchParams.get('svgName') || 'typescript'
    const backgroundColor = url.searchParams.get('backgroundColor') || '000000'
    const textColor = url.searchParams.get('textColor') || 'ffffff'
    const iconColor = url.searchParams.get('iconColor') || 'ffffff'

    const SVG_DATA: Record<string, string> = {
        typescript: `
            <svg fill="none" height="14" viewBox="0 0 256 256" width="14" xmlns="http://www.w3.org/2000/svg" >
                <rect fill="#${iconColor === "currentColor" ? "3178c6" : iconColor}" height="256" rx="20" width="256" />
                <path clip-rule="evenodd" d="m150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179s12.597 1.726 19.393 1.726c6.622 0 12.914-.633 18.874-1.899s11.187-3.352 15.678-6.257c4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163s-3.657-7.121-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661s-1.641-3.495-1.641-5.567c0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597 2.591.719 5.11 1.625 7.558 2.719 2.447 1.093 4.708 2.359 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582s-10.697-1.165-17.147-1.165c-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759 3.801 1.554 7.343 3.078 10.625 4.575 3.283 1.496 6.119 3.049 8.509 4.66s4.276 3.366 5.658 5.265 2.073 4.057 2.073 6.474c0 1.783-.432 3.438-1.296 4.963-.863 1.524-2.174 2.848-3.93 3.97s-3.945 1.999-6.565 2.632-5.687.95-9.2.95c-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451zm-46.036-68.733h35.518v-22.742h-99v22.742h35.3447v101.258h28.1373z" fill="#${backgroundColor}" fill-rule="evenodd" />
            </svg>
        `
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const badgeHTML = `
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
                <style>
                    .badge {
                        width: 126.5px;
                        height: 28px;
                        display: flex;
                        align-items: center;
                        padding-left: 0.5rem;
                    }
                    .text {
                        font-family: "Poppins", sans-serif;
                        font-weight: 700;
                        font-style: normal;
                        font-size: 0.75rem;
                        line-height: calc(1/0.75);
                        letter-spacing: 0.1em;
                        margin-left: 0.75rem;
                        text-transform: uppercase;
                    }
                </style>
            </head>
            <body>
                <div class="badge" style="background-color: #${backgroundColor};">
                    ${svgName && SVG_DATA[svgName]}
                    <span style="color: #${textColor};" class="text">${text}</span>
                </div>
            </body>
        </html>
    `

    await page.setContent(badgeHTML)
    const div = await page.$('div')

    let screenshotBuffer;

    if (div) {
        screenshotBuffer = await div.screenshot({ type: 'png' })
    }

    await browser.close()

    return new NextResponse(screenshotBuffer, {
        headers: {
            'Content-Type': 'image/png'
        }
    })
}