import Layout from "./Layout";
import React, { useState } from "react";
import firebaseClient from "../firebaseClient";
import firebase from "firebase";
import "firebase/auth";
import Alert from "@material-ui/core/Snackbar";
import { func } from "prop-types";
import { useToast } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

export default function Login() {
  firebaseClient();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const toast = useToast();

  return (
    <div>
      <Head>
        <title>Audio Party - Login or Sign in</title>
      </Head>
      <div className="text-center pt-20">
        <Image
          src="/../public/favicon.ico"
          width="64"
          height="64"
          alt="Icon"
        ></Image>
        <h1 className="text-3xl">Log-in or Create an Account</h1>
        <form className="pt-12 inline-block	">
          <div className="form-group w-customlogin py-2">
            <label for="email">
              Email address <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group  pt-8">
            <label for="password">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
              placeholder="Enter password"
              value={pass}
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              Your password is secured by us
            </small>
          </div>
        </form>

        <div className="pt-12">
          <button
            type="button"
            className="btn btn-primary mr-4"
            disabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Create Account
          </button>

          <button
            type="button"
            className="btn btn-primary ml-48"
            disabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
