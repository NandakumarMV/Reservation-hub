import { z } from 'zod'


export const userSchema = z.object({
  name: z.string({ required_error: "Name is Required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z.string({ required_error: "Email is Required" })
    .email("Invalid email format"),

  mobile: z.string({ required_error: "Mobile Number is Required" })
    .min(8, "Mobile number must be at least 8 digits")
    .max(15, "Mobile number must be at most 15 digits"),

  country_code: z.string({ required_error: "Country Code is Required" })
    .min(1, "Country code is required")
    .max(5, "Invalid country code"),

  nationality: z.string({ required_error: "Nationality is Required" })
    .min(2, "Nationality must be at least 2 characters")
    .max(50, "Invalid nationality"),

  // role: z.string({ required_error: "Role is required" })
  //   .refine((val) => mongoose.Types.ObjectId.isValid(val), {
  //     message: "Invalid role ID",
  //   })
});

