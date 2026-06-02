import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendMailOptions = {
    subject: string;
    html: string;
    from: string;
};

export async function sendMail({ subject, html, from }: SendMailOptions) {
    const to = process.env.DESTINATION_EMAIL;

    if (!to) throw new Error('DESTINATION_EMAIL is not set');

    const { data, error } = await resend.emails.send({
        from: from,
        to,
        subject,
        html,
        replyTo: from,
    });

    if (error) throw error;

    return data;
}
