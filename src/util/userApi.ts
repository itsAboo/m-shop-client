import axios from "axios";
import { getToken, saveToken } from "./auth";

interface SignInForm {
  email?: string;
  password?: string;
}

interface SignUpForm extends SignInForm {
  firstName?: string;
  lastName?: string;
}

export const signUp = async ({ inputForm }: { inputForm: SignUpForm }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/signup`,
      {
        ...inputForm,
      }
    );
    saveToken(response.data.token);
    return {
      msg: response.data.msg,
      user: response.data.user,
    };
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const signIn = async ({ inputForm }: { inputForm: SignInForm }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/signin`,
      { ...inputForm }
    );
    saveToken(response.data.token);
    return {
      msg: response.data.msg,
      user: response.data.user,
    };
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const updateUser = async ({
  inputForm,
}: {
  inputForm: {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string | number;
  };
}) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_API}/user`,
      {
        firstName: inputForm.firstName || "",
        lastName: inputForm.lastName || "",
        address: inputForm.address || "",
        phoneNumber: inputForm.phoneNumber || "",
      },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data.msg;
  } catch (error: any) {
    throw new Error(error);
  }
};
