import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { useForm } from "react-hook-form";
import FormController from "../../../component/formHandler/formController";
import { handleAuth } from "../../../redux/actions/auth";
import { Error } from "../../../styles/components/Error";
import { SignUpBtn, Terms } from "./signUpStyles";
import Link from "next/link";
import { ButtonHighlight } from "../../../styles/components/buttons/buttonHiglight";
import { ButtonFade } from "../../../styles/components/buttons/buttonFade";
import { InputIcon } from "../../../styles/components/inputs/authInput";
import Image from "next/image";

export default function FormWrapper() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(handleAuth(data));
    console.log(data);
  };
  const [visibility, setVisibility] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const { data, loading, error } = useSelector(({ auth }) => auth);

  const alert = () => {
    if (data?.status) {
      toast.success(data && data?.response?.data?.message, { autoClose: 4000 });
    } else {
      toast.warn(data && data?.response?.data?.message, { autoClose: 4000 });
    }
  };

  useEffect(() => {
    if (!loading) {
      alert();
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer autoClose={8000} />

      <FormController
        control="input"
        defaultValue="test"
        label="username"
        border={errors.first_name && "1px solid red"}
        register={register}
        required={true}
        minLength={3}
      />
      {errors.username && <Error>This field is required</Error>}

      <FormController
        control="input"
        defaultValue="test"
        label="email"
        register={register}
        border={errors.first_name && "1px solid red"}
        required={true}
      />
      {errors.email && <Error>This field is required</Error>}

      <FormController
        control="input"
        defaultValue="test"
        label="first_name"
        border={errors.first_name && "1px solid red"}
        register={register}
        required
      />
      {errors.first_name && <Error>This field is required</Error>}

      <FormController
        control="input"
        defaultValue="test"
        label="last_name"
        register={register}
        border={errors.first_name && "1px solid red"}
        required
      />
      {errors.last_name && <Error>This field is required</Error>}

      <FormController
        control="input"
        defaultValue="test"
        label="password"
        type={visibility ? "text" : "password"}
        border={errors.first_name && "1px solid red"}
        register={register}
        required
      >
        <InputIcon onClick={toggleVisibility}>
          <Image src={"/svgs/eye.svg"} width={25} height={25} alt="eye" />
        </InputIcon>
      </FormController>

      {errors.password && <Error>This field is required</Error>}
      <Terms>
        <FormController
          control="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="termstxt">
          <span>
            Creating an account means you agree with our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>
          </span>
        </div>
      </Terms>
      <SignUpBtn>
        {checked ? (
          <ButtonHighlight type="submit" disabled={checked ? false : true}>
            submit{" "}
          </ButtonHighlight>
        ) : (
          <ButtonFade disabled={checked ? false : true}>submit</ButtonFade>
        )}
      </SignUpBtn>
    </form>
  );
}
