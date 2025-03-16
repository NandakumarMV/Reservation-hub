import { z } from 'zod'


export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().min(8, "Mobile number must be at least 8 digits").max(15, "Mobile number must be at most 15 digits"),
  country_code: z.string().min(1, "Country code is required").max(5, "Invalid country code"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters").max(50, "Invalid nationality"),
});

