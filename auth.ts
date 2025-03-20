import NextAuth from 'next-auth';
import { authConfig } from './auth.config.ts';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions.ts';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';

const sql = neon("postgres://neondb_owner:npg_iXpeAgQLrY74@ep-nameless-recipe-a168bzgy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}` as User[];
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});