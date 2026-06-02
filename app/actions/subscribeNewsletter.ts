'use server';

import { addContact } from '@/lib/mail';

export type SubscribeState = { success: true } | { success: false; error: string } | null;

export async function subscribeNewsletter(
    _: SubscribeState,
    formData: FormData,
): Promise<SubscribeState> {
    const email = (formData.get('email') as string)?.trim();

    if (!email) return { success: false, error: "L'adresse email est requise." };

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return { success: false, error: 'Adresse email invalide.' };
    }

    try {
        await addContact(email);
        return { success: true };
    } catch (err) {
        return { success: false, error: 'Une erreur est survenue. Réessaie plus tard.' };
    }
}
