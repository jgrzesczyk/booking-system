"use client";

import { PageTitle } from "@/components";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useWatch } from "rc-field-form";
import { useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const [form] = useForm();
  const [error, setError] = useState("");
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const watchForm = useWatch([], form);

  useEffect(() => {
    setError("");
  }, [watchForm]);

  const handleRegister = async () => {
    const res = await fetch("/api/admin/auth/register", {
      method: "POST",
      body: JSON.stringify(form.getFieldsValue()),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      // registration success
    } else {
      //registration faled
    }
  };

  const handleSubmit = async () => {
    const { login, password } = form.getFieldsValue();
    let res = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const redirectUrl =
        searchParams.get("callbackUrl") || "/admin/reservations";
      push(redirectUrl);
    } else {
      setError("Wystąpił błąd przy zalogowaniu, spróbuj ponownie");
    }
  };

  return (
    <>
      <PageTitle isAdmin title="Logowanie" />
      <main className="w-full max-w-screen-lg mx-auto my-10">
        <h2>Logowanie do panelu</h2>
        <Form form={form} layout="vertical">
          <Form.Item label="Login" name="login">
            <Input />
          </Form.Item>
          <Form.Item label="Hasło" name="password">
            <Input type="password" />
          </Form.Item>
          <Button type="link" onClick={() => handleSubmit()}>
            Zaloguj
          </Button>
        </Form>
        {error && <div className="text-red-800">{error}</div>}
      </main>
    </>
  );
};

export default Login;
