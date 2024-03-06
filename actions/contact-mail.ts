'use server';
import * as z from 'zod';
import { ContactMeSchema } from '@/schemas';
import { sendContactMail } from '@/lib/mail';

export const contactMail = async (values: z.infer<typeof ContactMeSchema>) => {
  const validatedFields = ContactMeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, name, subject, context } = validatedFields.data;
  try {
    await sendContactMail(email, name, subject, context);
    return { success: 'Mail sent successfully!' };
  } catch (error) {
    return { error: 'Sending mail failed!' };
  }
};
