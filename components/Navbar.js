import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../auth";
import firebase from "firebase/app";
import { Button } from "@material-ui/core";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Tooltip } from "@material-ui/core";
import React from "react";

export default function Navbar() {
  const db = firebase.firestore();

  const { user } = useAuth();
  var ConfText = "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [songName, setsongName] = useState("");
  const [artistName, setartistName] = useState("");
  const [userName, setuserName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("uploads")
      .add({
        id: Math.random() * (10000000000000000).toString(),
        songname: songName,
        artistName: artistName,
        username: userName,
        songlink: link,
        likes: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoader(false);
        toast({
          title: "Success",
          description: "The song has been uploaded successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setsongName("");
    setartistName("");
    setuserName("");
    setLink("");

    db.collection("uploads").orderBy("songname");
  };
  var sign = "";

  var SignOut = async () => {
    await firebase.auth().signOut();
    window.location.href = "/";
  };

  if (user) {
    sign = "Sign out";
  } else {
    sign = "Sign In";
    SignOut = "";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <div className="float-right pl-4 text-3xl pt-2">Audio Party</div>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto"></ul>

            <div className="relative right-12">
              <Tooltip
                onClick={onOpen}
                title="Upload new song"
                aria-label="add"
              >
                <Button variant="contained">Create new Post</Button>
              </Tooltip>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Upload new music</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <form onSubmit={handleSubmit}>
                      <FormControl isRequired>
                        <FormLabel>Song Name</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Song name"
                          value={songName}
                          onChange={(e) => setsongName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Song Artist</FormLabel>
                        <Input
                          placeholder="Artist name"
                          value={artistName}
                          onChange={(e) => setartistName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Your name</FormLabel>
                        <Input
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setuserName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4} id="upload" isRequired>
                        <FormLabel>Song Link</FormLabel>
                        <Input
                          placeholder="Song Link (e.g. YouTube, SoundCloud, etc.."
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        ></Input>
                      </FormControl>

                      <ModalFooter>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          className="mr-8"
                        >
                          Upload
                        </Button>
                        <Button variant="contained" onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>

            <form className="d-flex">
              <Link href="/" passHref>
                <button
                  className="btn btn-secondary my-2 my-sm-0"
                  onClick={SignOut}
                >
                  {sign}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 float-right ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
