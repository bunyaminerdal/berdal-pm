'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user.email) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = false;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.email !== user.email) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Verification email sent!' };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: 'Incorrect password!' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const { newPassword, ...rest } = values;

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...rest,
    },
  });
  // update({
  //   user: {
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
  //   },
  // });

  return { success: 'Settings Updated!' };
};
