import { initializeApp, FirebaseOptions } from "firebase/app";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {notification} from "antd";

const firebaseConfig : FirebaseOptions = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    apiKey: "AIzaSyA3iLz0KP8EFy0TlzsVymEfpi8MPf15YWk",
    authDomain: "thesis-blob-storage.firebaseapp.com",
    projectId: "thesis-blob-storage",
    storageBucket: "thesis-blob-storage.appspot.com",
    messagingSenderId: "1068579775535",
    appId: "1:1068579775535:web:c5e0b208452a7eed7792da",
    measurementId: "G-WL1WSLE3FV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Upload file
export const uploadFile = (storageRef : any, file : any, newMetadata : any) => {
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file, newMetadata);
    uploadTask.on(
        "state_changed",
        null,
        // https://firebase.google.com/docs/storage/web/handle-errors
        (err) => {
            console.log(err)
            switch (err.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
            });
        }
    );
}

// delete file
export const deleteFile = (storageRef: any) => {
    // Delete the file
    deleteObject(storageRef).then(() => {
        // File deleted successfully

    }).catch((error) => {
        // Uh-oh, an error occurred!
        notification.open({
            message : "Delete file",
            description :  String(error),
            type : "error",
        });
    });
}

export default firebaseApp;