import { validator } from "hono/validator";

export const validate = validator("json", (value, c) => {
  if (!value.name || !value.email || !value.password) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.email)) {
    return c.json({ message: "Invalid email format" }, 400);
  }

  // Validasi password kuat
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(value.password)) {
    return c.json(
      {
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
      400
    );
  }
  return value;
});
