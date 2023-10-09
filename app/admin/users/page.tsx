"use client";

import { PageTitle } from "@/components";
import { useForm } from "antd/es/form/Form";
import { Form, Input } from "antd";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";

const Users = () => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleRegister = async () => {
    const res = await fetch("/api/admin/auth/register", {
      method: "POST",
      body: JSON.stringify(form.getFieldsValue()),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  };

  return (
    <>
      <PageTitle isAdmin title="Lista administratorów" />
      <main className="w-full max-w-screen-lg mx-auto my-10 flex">
        <div>xx</div>
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
            onClick={() => !isLoading && handleRegister()}
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

export default Users;
