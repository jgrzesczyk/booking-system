"use client";

import { PageTitle } from "@/components";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useWatch } from "rc-field-form";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const watchForm = useWatch([], form);

  useEffect(() => {
    setError("");
  }, [watchForm]);

  const handleSubmit = async () => {
    const { login, password } = form.getFieldsValue();

    if (!login || !password) {
      setError("Nie podano danych do logowania.");
      return;
    }

    setIsLoading(true);

    const res = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const redirectUrl = searchParams.get("callbackUrl") || "/admin/users";
      push(redirectUrl);
    } else {
      setError("Wystąpił błąd przy zalogowaniu, spróbuj ponownie.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle isAdmin title="Logowanie" />
      <main className="w-full max-w-screen-lg mx-auto my-10 flex justify-center">
        <Form
          form={form}
          layout="vertical"
          className="w-64 max-w-full flex flex-col justify-center"
        >
          <Form.Item label="Login" name="login">
            <Input />
          </Form.Item>
          <Form.Item label="Hasło" name="password">
            <Input type="password" />
          </Form.Item>
          <button
            className={clsx(
              !isLoading &&
                "bg-blue-800 bg-opacity-80 text-white cursor-pointer",
              isLoading && "bg-gray-200",
              "rounded-md py-2 flex items-center justify-center gap-4",
            )}
            onClick={() => !isLoading && handleSubmit()}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner />}
            <span>Zaloguj</span>
          </button>
          {error && (
            <div className="text-red-800 mt-4 text-center">{error}</div>
          )}
        </Form>
      </main>
    </>
  );
};

export default Login;
