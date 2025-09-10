import { useState, useEffect } from "react";

export function usePasswordStrength(password) {
  const [strength, setStrength] = useState({ level: "weak", color: "error.main" });

  useEffect(() => {
    if (!password) {
      setStrength({ level: "", color: "inherit" });
      return;
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) setStrength({ level: "weak", color: "error.main" });
    else if (score === 2) setStrength({ level: "medium", color: "warning.main" });
    else setStrength({ level: "strength", color: "success.main" });

  }, [password]);

  return strength;
}
