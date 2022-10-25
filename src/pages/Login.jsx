import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.min.css";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LOGIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      admins {
        authToken
        email
        firstName
        id
        lastName
      }
      errors
      status
    }
  }
`;

export const Login = () => {
  console.log("renders");
  const [loginAdmin, { loading }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const submitCred = async (values) => {
    const { data } = await loginAdmin({
      variables: { email: values.username, password: values.password },
    });
    if (data?.loginAdmin) {
      console.log(loading, data);
      const { admins, errors, status } = data?.loginAdmin;
      if (!errors && status === 200) {
        //add auth token to localstorage/sessionstorage for future ref
        window.sessionStorage.setItem("authKey", admins?.authToken);
        //adding a success toast
        toast.success(`Login Successfull !`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        //navigate to invoice list page
        navigate("/");
      } else {
        console.log("err");
        //show error toast
        toast.error(`oops!! ${errors[0]}`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={submitCred}
        style={{
          margin: "auto",
          border: "1px solid gray",
          padding: "24px 56px",
          borderRadius: "1.5rem",
        }}
      >
        <Form.Item>
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={loading}
          >
            {`${loading ? "Logging In..." : "Log In"}`}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
