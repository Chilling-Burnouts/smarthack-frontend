import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});
