import React, { createContext, useState, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import {
  uploadRequest,
  mediaUploadRequest,
  mediaDeleteRequest,
} from "./files.service";

export const FilesContext = createContext();

export const FilesContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthenticationContext);

  const onUpload = (filename, file, field) => {
    return new Promise((resolve, reject) => {
      const { email } = user;
      uploadRequest(email, filename, file, field)
        .then((u) => {
          setUser({ ...user, ...u });
          resolve();
        })
        .catch((e) => {
          setError(e);
          reject(e);
        });
    });
  };

  const onUploadMedia = (filename, file, mediaType, title, fileType) => {
    return new Promise((resolve, reject) => {
      mediaUploadRequest(filename, file, mediaType, title, fileType)
        .then((u) => {
          setUser({ ...user, ...u });
          resolve();
        })
        .catch((e) => {
          setError(e);
          reject(e);
        });
    });
  };

  const onDeleteMedia = (url, mediaType) => {
    return new Promise((resolve, reject) => {
      mediaDeleteRequest(url, mediaType)
        .then((u) => {
          setUser({ ...user, ...u });
          resolve();
        })
        .catch((e) => {
          setError(e);
          reject(e);
        });
    });
  };

  return (
    <FilesContext.Provider value={{ onUpload, onUploadMedia, onDeleteMedia }}>
      {children}
    </FilesContext.Provider>
  );
};
