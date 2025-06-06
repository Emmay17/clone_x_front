// app/[username]/page.tsx
import { redirect } from 'next/navigation';

interface Props {
  params: {
    username: string;
  };
}
export default function ProfilePage({ params }: Props) {
    const { username } = params;
    redirect(`/dashboard/${username}/posts`);
  
}
