import React, {useState} from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import firebaseApp from "../config/firebase";

const storage = getStorage(firebaseApp);


const Test = () => {
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);

    // Handles input change event and updates state
    const  handleChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const  handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        // @ts-ignore
        const storageRef = ref(storage, `/files/${file.name}`);

        const newMetadata = {
            // cacheControl: 'public,max-age=300',
            contentType: 'image/jpeg',
            customMetadata : {
                user : "cn4f59@inf.elte.hu",
            }
        };


        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        // @ts-ignore
        const uploadTask = uploadBytesResumable(storageRef, file, newMetadata);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
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

    return (
        <div>
            Test
            <div>
                <input type="file" accept="image/*" onChange={handleChange}/>
                <button onClick={handleUpload}>Upload to Firebase</button>
            </div>
            <p>{percent} "% done"</p>
        </div>
    );
};

export default Test;