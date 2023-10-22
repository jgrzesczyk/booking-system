"use client";

import { PageTitle } from "@/components";
import { useForm } from "antd/es/form/Form";
import { Form, Input, message, Skeleton } from "antd";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AdminUser } from "@prisma/client";
import { AdminType } from ".prisma/client";
import { BsFillTrashFill } from "react-icons/bs";

const Users = () => {
  const [form] = useForm();
  const [users, setUsers] = useState<Partial<AdminUser>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", {
      method: "GET",
    });

    const users = await res.json();
    setUsers(users);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form.getFieldsValue()),
    });

    if (res?.ok) {
      await fetchUsers();
      form.resetFields();
      message.success("Dodano konto administratora.");
    } else {
      setError(
        "Wystąpił błąd przy rejestracji nowego administratora, spróbuj ponownie.",
      );
    }

    setIsLoading(false);
  };

  const handleRemove = async (user: Partial<AdminUser>) => {
    const res = await fetch(`/api/admin/users/${user.login}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchUsers();
      message.success("Usunięto konto administratora.");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
      setIsPageLoading(false);
    })();
  }, []);

  const renderContent = () => {
    if (isPageLoading) {
      return <Skeleton active />;
    }

    return (
      <>
        <Form
          form={form}
          layout="vertical"
          className="w-full md:w-64 max-w-full flex flex-col justify-center flex-grow"
        >
          <div className="mb-6 text-lg">Nowy administrator</div>
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
            <span>Zarejestruj</span>
          </button>
          {error && (
            <div className="text-red-800 mt-4 text-center">{error}</div>
          )}
        </Form>
        <div className="basis-full w-full flex-grow-0 md:basis-1/2">
          <table className="w-full text-left rounded-md">
            <thead className="border-b-2">
              <tr>
                <th className="px-2 py-3">Login</th>
                <th className="px-2 py-3">Rola</th>
                <th className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user.login}
                  className={clsx("border-b", i % 2 === 0 && "bg-gray-100")}
                >
                  <td className="px-2 py-3">{user.login}</td>
                  <td className="px-2 py-3">{user.role}</td>
                  <td className="px-2 py-3">
                    {user.role === AdminType.User && (
                      <BsFillTrashFill
                        className="cursor-pointer"
                        onClick={() => handleRemove(user)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <PageTitle isAdmin title="Lista administratorów" />
      <main className="w-full max-w-screen-lg mx-auto my-10 px-10 items-center flex flex-col md:flex-row gap-16 md:items-start">
        {renderContent()}
      </main>
    </>
  );
};

export default Users;
