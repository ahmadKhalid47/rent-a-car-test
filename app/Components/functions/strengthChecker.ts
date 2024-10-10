export function checkPasswordStrength(password: string) {
  let strength = {
    score: 0,
    message: "",
    guide: "",
  };

  // If password is empty, show all the suggestions
  if (password === "") {
    strength.guide =
      "Password must be at least 6 characters long. Add lowercase letters. Add uppercase letters. Add numbers. Add special characters (e.g., !@#$%^&*).";
    strength.message = "Your password is too weak.";
    return strength;
  }

  // Check for minimum length
  if (password.length >= 6) {
    strength.score += 1;
  } else {
    strength.guide += "Password must be at least 6 characters long. ";
  }

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    strength.score += 1;
  } else {
    strength.guide += "Add lowercase letters. ";
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    strength.score += 1;
  } else {
    strength.guide += "Add uppercase letters. ";
  }

  // Check for numbers
  if (/\d/.test(password)) {
    strength.score += 1;
  } else {
    strength.guide += "Add numbers. ";
  }

  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength.score += 1;
  } else {
    strength.guide += "Add special characters (e.g., !@#$%^&*). ";
  }

  // Overall strength
  if (strength.score === 5) {
    strength.message = "Strong password";
  } else if (strength.score >= 3) {
    strength.message = "Your password is medium strength.";
  } else {
    strength.message = "Your password is weak.";
  }

  return strength;
}
