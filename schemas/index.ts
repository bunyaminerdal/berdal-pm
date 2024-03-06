import * as z from 'zod';

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Password is required!',
      path: ['password'],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: 'Minimum of 6 characters required',
    })
    .max(32, {
      message: 'Password must be less than 32 characters',
    }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email is required',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email is required',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Minimum 6 characters required',
    })
    .max(32, {
      message: 'Password must be less than 32 characters',
    }),
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(255, {
      message: 'Name must be less than 255 characters',
    }),
});

export const ContactMeSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email is required',
    })
    .max(255, {
      message: 'Email must be less than 255 characters',
    }),
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(255, {
      message: 'Name must be less than 255 characters',
    }),
  subject: z
    .string()
    .min(3, {
      message: 'Subject must bi at least 10 characters',
    })
    .max(255, {
      message: 'Subject must be less than 255 characters',
    }),
  context: z
    .string()
    .min(10, {
      message: 'Context must bi at least 10 characters',
    })
    .max(1000, {
      message: 'Context must be less than 1000 characters',
    }),
});

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(255, {
      message: 'Name must be less than 255 characters',
    }),
  description: z.string().max(255, {
    message: 'Description must be less than 255 characters',
  }),
  ownerId: z.string(),
});

export const TextSchema = z.object({
  textContext: z.string(),
});
