import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Vui lòng nhập email.' })
    .email('Vui lòng nhập chính xác email.'),
  password: z
    .string({ required_error: 'Vui lòng nhập mật khẩu.' })
    .min(1, 'Vui lòng nhập mật khẩu.'),
})

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: 'Vui lòng nhập email.' })
      .email('Vui lòng nhập chính xác email.'),
    password: z
      .string({ required_error: 'Vui lòng nhập mật khẩu.' })
      .min(6, 'Mật khẩu phải từ 6 ky tự trở lên.'),
    confirmPassword: z
      .string({ required_error: 'Vui lòng nhập lại mật khẩu' })
      .min(6, 'Mật khẩu phải từ 6 ky tự trở lên.'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Mật khẩu không trùng khớp.',
      })
    }
  })

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'Vui lòng nhập mật khẩu cũ.' })
      .min(6, 'Mật khẩu phải từ 6 ký tự trở lên.'),
    newPassword: z
      .string({ required_error: 'Vui lòng nhập mật khẩu mới.' })
      .min(6, 'Mật khẩu phải từ 6 ký tự trở lên.'),
    confirmPassword: z
      .string({ required_error: 'Vui lòng nhập lại mật khẩu mới.' })
      .min(6, 'Mật khẩu phải từ 6 ky tự trở lên.'),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Mật khẩu không trùng khớp.',
      })
    }
  })
