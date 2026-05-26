import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllArticles } from '@/lib/blog/get-articles';

export async function GET() {
    const siteUrl = 'https://matheoguilbert.fr';

    const feed = new RSS({
        title: 'Macthéo Guilbert | Blog',
        description: 'Développement web, UI/UX et automatisations.',
        feed_url: `${siteUrl}/rss.xml`,
        site_url: siteUrl,
        language: 'fr',
        pubDate: new Date(),
    });

    try {
        const articles = await getAllArticles('fr');

        articles.forEach((article) => {
            feed.item({
                title: article.title,
                description: article.description || '', 
                url: `${siteUrl}/fr/blog/${article.slug}`,
                guid: article.slug,
                date: article.date,
                custom_elements: [
                    { 'full_text': article.content || '' }
                ],
            });
        });

        return new NextResponse(feed.xml({ indent: true }), {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
        });
    } catch (error) {
        console.error('Erreur lors de la génération du flux RSS:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}