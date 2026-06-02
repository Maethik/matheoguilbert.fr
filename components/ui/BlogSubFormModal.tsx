'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { createPortal } from 'react-dom';
import { sendContactMail, type ContactFormState } from '@/app/actions/sendContactMail';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type FieldProps = {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    textarea?: boolean;
    inputRef?: React.RefObject<HTMLInputElement | null>;
};

function Field({ label, name, type = 'text', required, textarea, inputRef }: FieldProps) {
    const base =
        'w-full font-sans text-sm text-brand-brown bg-white/60 border border-brand-brown/12 rounded-lg px-4 py-3 placeholder:text-brand-brown/25 focus:outline-none focus:border-brand-brown/35 focus:bg-white/80 transition-colors duration-150';

    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[11px] uppercase tracking-[0.18em] text-brand-brown/45">
                {label}
            </label>
            {textarea ? (
                <textarea
                    name={name}
                    required={required}
                    rows={5}
                    className={`${base} resize-none`}
                />
            ) : (
                <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    name={name}
                    type={type}
                    required={required}
                    className={base}
                />
            )}
        </div>
    );
}

export function BlogSubFormModal({ isOpen, onClose }: Props) {
    const [mounted, setMounted] = useState(false);
    const [state, action, pending] = useActionState<ContactFormState, FormData>(
        sendContactMail,
        null,
    );
    const firstInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => firstInputRef.current?.focus(), 50);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) formRef.current?.reset();
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full max-w-lg bg-brand-beige rounded-2xl shadow-2xl flex flex-col gap-7 p-8 md:p-10">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="font-serif text-brand-brown text-[clamp(1.3rem,2vw,1.65rem)] leading-tight">
                            Abonnez-vous au blog
                        </h2>
                        <p className="font-sans text-sm text-brand-brown/45 mt-1.5">
                            Recevez une alerte par mail quand un nouvel article est publie. C'est gratuit.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Fermer"
                        className="shrink-0 p-1.5 rounded-lg text-brand-brown/35 hover:text-brand-brown hover:bg-brand-brown/6 transition-colors duration-150 cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Success */}
                {state?.success ? (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <span className="font-serif text-brand-brown text-xl">C'est note !</span>
                        <p className="font-sans text-sm text-brand-brown/45">Vous devriez recevoir un mail de confirmation d'ici peu.</p>
                        <button
                            onClick={onClose}
                            className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-brand-brown/40 hover:text-brand-brown border-b border-brand-brown/20 hover:border-brand-brown pb-0.5 transition-colors duration-150 cursor-pointer"
                        >
                            Fermer
                        </button>
                    </div>
                ) : (
                    <form ref={formRef} action={action} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Email" name="email" type="email" required />
                        </div>

                        {state?.error && (
                            <p className="font-sans text-xs text-red-700/80">{state.error}</p>
                        )}

                        <div className="flex justify-end pt-1">
                            <button
                                type="submit"
                                disabled={pending}
                                className="inline-flex items-center gap-2.5 font-sans text-[13px] tracking-wide text-brand-beige bg-brand-brown rounded-lg px-7 py-3 hover:bg-brand-brown/85 disabled:opacity-50 transition-colors duration-200 cursor-pointer disabled:cursor-default"
                            >
                                {pending ? 'Envoi…' : 'Envoyer'}
                                {!pending && (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>,
        document.body,
    );
}