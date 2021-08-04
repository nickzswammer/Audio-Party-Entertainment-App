import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import React from "react";
import Link from "next/link";
import { useAuth } from "../auth";
import Login from "../components/Login";
import ReactPlayer from "react-player";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import firebaseClient from "../firebaseClient";
import firebase from "firebase";
import "firebase/auth";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Select } from "@chakra-ui/select";
import { db } from "../firebaseClient";
import { useState } from "react";
import auth from "../firebaseClient";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Footer from "../components/Footer";
import { LikeButton } from "@lyket/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { snapshotViewportBox } from "framer-motion";

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return today;
}

function getTime() {
  var today = new Date();
  var time = ((today.getHours() + 11) % 12) + 1 + ":" + today.getMinutes();

  return time;
}

function increaseLikes(id) {
  const userRef = db.collection("uploads").doc(id);
  const increment = firebase.firestore.FieldValue.increment(1);

  userRef.update({ likes: increment });
}

export default function Home() {
  const db = firebase.firestore();

  const documentIds = [];

  const { user } = useAuth();

  var ConfText = "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  const increment = firebase.firestore.FieldValue.increment(1);

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

    console.log(firebase.firestore.FieldValue.serverTimestamp());
    setsongName("");
    setartistName("");
    setuserName("");
    setLink("");

    db.collection("uploads").orderBy("songname", "asc");
  };

  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const ref = firebase.firestore().collection("uploads");

    function getUploads() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUploads(items);
      });
    }
    getUploads();
  }, []);

  if (user) {
    ConfText = "Signed in";
    return (
      <div>
        <Head>
          <title>Audio Party - Discover Music</title>
        </Head>

        <Layout>
          <div id="fb-root"></div>
          <script
            async
            defer
            crossorigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0"
            nonce="98Z1r5fd"
          ></script>
          <div className="text-center music-banner py-24 text-white">
            <h1 className="text-5xl pt-5  ">Welcome to Audio Party!</h1>
            <p className="pt-3 text-2xl">Share and discover music.</p>
          </div>

          <div className="">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="bg-white mx-48 p-11 shadow-md border-on-bottom  my-2"
              >
                <div>
                  <div className="text-blue-500 cursor-pointer hover:text-blue-800 inline-block">
                    <Link href={upload.songlink}>
                      <h2 className="text-2xl mb-2">
                        {upload.songname} - {upload.artistName}
                      </h2>
                    </Link>
                  </div>

                  <div className="mb-3">
                    <p>From: {upload.username}</p>
                  </div>

                  <div>
                    <LikeButton id={upload.id} namespace={upload.songName} />
                  </div>

                  <div className="mt-2">
                    <p>Uploaded On: {upload.timestamp.toDate().toString()} </p>
                  </div>

                  <ReactPlayer
                    className="float-right relative bottom-24"
                    width="1000px"
                    height="50px"
                    controls="true"
                    config={{
                      file: {
                        forceAudio: true,
                      },
                    }}
                    url={upload.songlink}
                  ></ReactPlayer>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed right-0 bottom-12 pr-10">
            <Tooltip onClick={onOpen} title="Upload new song" aria-label="add">
              <Fab color="primary">
                <AddIcon />
              </Fab>
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
                      <Button type="submit" colorScheme="blue" mr={3}>
                        Upload
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </Layout>
      </div>
    );
  } else {
    ConfText = "Sign in";
    return (
      <div>
        <Head>
          <title>Audio Party - Log In</title>
        </Head>
        <Login></Login>
      </div>
    );
  }
}
