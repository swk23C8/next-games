import { Auth } from '@supabase/ui';
import Link from 'next/link';

import Layout from '../components/Layout/Layout';
import { useAuth, VIEWS } from '../lib/auth';
import { supabase } from '../lib/client';

export default function Home() {
	const { user, view, signOut } = useAuth();

	if (view === VIEWS.UPDATE_PASSWORD) {
		return (
			<>
				<Auth.UpdatePassword supabaseClient={supabase} />
			</>
		);
	}

	return (
		<>
			{user && (
				<>
					<h2>Welcome!</h2>
					<code className="highlight">{user.role}</code>
					<Link href="/profile">
						<a className="button">Go to Profile</a>
					</Link>
					<button type="button" className="button" onClick={signOut}>
						Sign Out
					</button>
				</>
			)}
			{!user && <Auth view={view} supabaseClient={supabase} />}
		</>
	);
}