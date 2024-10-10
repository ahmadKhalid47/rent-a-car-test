// checkPasswordStrength.ts
export interface PasswordStrength {
  criteria: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialCharacter: boolean;
  };
  score: number;
  message: string;
  guide: string;
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const criteria = {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;
  let message = "";
  let guide = "";

  // Overall strength message
  if (score === 5) {
    message = "Strong password";
  } else if (score >= 3) {
    message = "Your password is medium strength.";
  } else {
    message = "Your password is weak.";
  }

  // Guide for unmet criteria
  if (!criteria.length)
    guide += "Password must be at least 6 characters long. ";
  if (!criteria.lowercase) guide += "Add lowercase letters. ";
  if (!criteria.uppercase) guide += "Add uppercase letters. ";
  if (!criteria.number) guide += "Add numbers. ";
  if (!criteria.specialCharacter)
    guide += "Add special characters (e.g., !@#$%^&*). ";

  return { criteria, score, message, guide };
}
