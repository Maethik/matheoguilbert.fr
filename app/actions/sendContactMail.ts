'use server';

import { sendMail } from '@/lib/mail';

export type ContactFormState = { success: true } | { success: false; error: string } | null;

export async function sendContactMail(
    _: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
        return { success: false, error: 'Tous les champs sont requis.' };
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return { success: false, error: 'Adresse email invalide.' };
    }

    try {
        await sendMail({
            from: 'Formulaire de contact <noreply@matheoguilbert.fr>',
            subject: `Message de ${name}`,
            html: `
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <hr/>
                <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        });
        return { success: true };
    } catch {
        return { success: false, error: 'Une erreur est survenue. Réessaie plus tard.' };
    }
}
