// app/[username]/page.tsx
// "use client";
import { redirect } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: {
    username: string;
  };
}
export default function ProfilePage({ params }: Props) {
    const { username } = params;
    redirect(`/dashboard/${username}/posts`);
    return null;
}
