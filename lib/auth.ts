import { cookies } from 'next/headers';

const TOKEN_KEY = 'auth_token';

export async function getSessionToken(){
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_KEY)?.value;
}