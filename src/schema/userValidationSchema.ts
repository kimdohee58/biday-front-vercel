import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .max(6, { message: '이름은 6글자 이하만 입력할 수 있습니다.' }), // name 필드 추가
    email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
    password: z
        .string()
        .min(11, {message: '비밀번호는 최소 11글자 이상이어야 합니다.',})
        .regex(/[A-Z]/, {message: '비밀번호에는 최소 1개 이상의 대문자가 포함되어 있어야 합니다.',})
        .regex(/[^A-Za-z0-9]/, {message: '비밀번호에는 최소 1개 이상의 특수문자가 포함되어 있어야 합니다.'})
        .regex(/[0-9]/, { message: '비밀번호에는 최소 1개 이상의 숫자가 포함되어 있어야 합니다.' }), // 숫자 포함
    phoneNum: z.string()
        .regex(/^010-\d{4}-\d{4}$/, {
            message: '전화번호는 010-1234-5678 형식으로 입력해야 합니다.',
        }).optional(),
});

// 스키마에서 타입 추론
export type SignUpSchema = z.infer<typeof signUpSchema>;
