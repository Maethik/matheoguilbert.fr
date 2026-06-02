'use client';

import { useState } from 'react';
import { BlogSubFormModal } from '@/components/ui/BlogSubFormModal';

export function BlogSubFormController() {
    const [subOpen, setSubOpen] = useState(false);
    return <BlogSubFormModal isOpen={subOpen} onClose={() => setSubOpen(false)} />;
}
