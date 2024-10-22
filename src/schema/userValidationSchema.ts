//src/schema/userValidationSchema.ts
import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .max(6, {message: '이름은 6글자 이하만 입력할 수 있습니다.'}), // name 필드 추가
    email: z.string().email({message: '유효하지 않은 이메일 형식입니다.'}),
    password: z
        .string()
        .min(8, {message: '비밀번호는 최소 8글자 이상이어야 합니다.',})
        .refine((val) => /[A-Z]/.test(val), {
            message: '비밀번호에는 최소 1개 이상의 대문자가 포함되어 있어야 합니다.',
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
            message: '비밀번호에는 최소 1개 이상의 특수문자가 포함되어 있어야 합니다.',
        })
        .refine((val) => /[0-9]/.test(val), {
            message: '비밀번호에는 최소 1개 이상의 숫자가 포함되어 있어야 합니다.',
        }),
    confirmPassword: z
        .string()
        .min(8, {message: "비밀번호 확인해주세요."}),
    phoneNum: z
        .string()
        .regex(/^010-\d{4}-\d{4}$/, {
            message: '전화번호는 010-1234-5678 형식으로 입력해야 합니다.',
        }).optional(), // phoneNum 필드 위치 수정
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

// 스키마에서 타입 추론
export type SignUpSchema = z.infer<typeof signUpSchema>;