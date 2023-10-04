import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error('Please set the SESSION_SECRET environment variable');

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'user-session',
    secrets: [sessionSecret],
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

export async function createUserSession(redirectTo: string, user: any) {
  const sessionData = await getSession();
  sessionData.set('user-session', user);
  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await commitSession(sessionData) }
  });
}

function getUserSession(request: Request) {
  return getSession(request.headers.get('Cookie'));
}

export async function getUserData(request: Request) {
  const session = await getUserSession(request);
  return session.get('user-session');
}

export async function logout(request: Request) {
  const sessionData = await getUserSession(request);
  return redirect("/", {
    headers: { 'Set-Cookie': await destroySession(sessionData) }
  })
}