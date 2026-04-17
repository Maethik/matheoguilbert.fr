import createMiddleware from 'next-intl/middleware';

export const locales = ['fr', 'en'];
export const defaultLocale = 'en';

export default createMiddleware({
    // Supported languages
    locales: locales,

    // Default language
    defaultLocale: defaultLocale,

    localePrefix: 'always'
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};