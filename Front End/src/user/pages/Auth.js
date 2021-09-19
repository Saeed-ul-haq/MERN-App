import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/AuthProvider";
import "./Auth.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpin from "../../shared/components/UIElements/LoadingSpin";
const Auth = () => {
  const {signIn} = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [errors, seterrors] = useState("");
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    if (isLoginMode) {
      setisLoading(true);
      fetch("http://localhost:5000/api/users/login ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formState.inputs.password.value,
          email: formState.inputs.email.value,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          setisLoading(false);
          signIn(res.data);
        })

        .catch((err) => {
          setisLoading(false);
          seterrors(err.message || "Something went wrong , please try again");
        });
    } else {
      setisLoading(true);
      fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          password: formState.inputs.password.value,
          email: formState.inputs.email.value,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          setisLoading(false);
          signIn(res.data);

        })
        .catch((err) => {
          setisLoading(false);
          seterrors(err.message || "Something went wrong , please try again");
        });
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={errors} onClear={() => seterrors(null)} />
      <Card className="authentication">
        {isLoading && <LoadingSpin overlay={true} />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
