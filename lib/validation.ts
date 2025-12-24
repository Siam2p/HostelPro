/**
 * Validates if the given string is a valid Bangladeshi phone number.
 * Supports formats: +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX
 */
export const isValidBangladeshiPhone = (phone: string): boolean => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    return regex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Validates if the given password is secure based on:
 * - Minimum 8 characters
 * - NOT a common sequence (e.g., 12345678, 87654321, 00000000)
 */
export const isSecurePassword = (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 8) {
        return { isValid: false, message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে' };
    }

    // Check for common sequences
    const sequences = [
        '12345678', '87654321',
        '01234567', '76543210',
        'abcdefgh', 'hgfedcba',
        'password'
    ];

    // Check for repeated characters (e.g., 00000000, 11111111)
    const isRepeated = /^(.)\1{7,}$/.test(password);

    if (isRepeated) {
        return { isValid: false, message: 'খুবই সহজ পাসওয়ার্ড, অন্য কিছু চেষ্টা করুন' };
    }

    // Check if the password contains any of the forbidden sequences
    const lowerPassword = password.toLowerCase();
    for (const seq of sequences) {
        if (lowerPassword.includes(seq)) {
            return { isValid: false, message: 'অনুগ্রহ করে আরও শক্তিশালী পাসওয়ার্ড দিন' };
        }
    }

    // Additional sequence check for numeric strings
    if (/^\d+$/.test(password)) {
        // Check if it's a simple incrementing/decrementing sequence of length 8 or more
        let isSimpleSeq = true;
        for (let i = 1; i < password.length; i++) {
            if (Math.abs(password.charCodeAt(i) - password.charCodeAt(i - 1)) !== 1) {
                isSimpleSeq = false;
                break;
            }
        }
        if (isSimpleSeq && password.length >= 8) {
            return { isValid: false, message: 'ক্রমানুসারী সংখ্যা (যেমন ১২৩৪... ) ব্যবহার করা যাবে না' };
        }
    }

    return { isValid: true };
};
