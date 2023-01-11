import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import "../STYLING/imageUploads.css";
function ImageUpload(props) {
    const [file, setfile] = useState();
    const [previewURL, setpreview] = useState();
  

    const filePicker = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setpreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }, [file]);

    function pickedHandler(event) {
        let pickedFile;
       
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setfile(pickedFile);
         
        } 
        props.onInput(props.id, pickedFile);

    };

    function upload() {
        filePicker.current.click();
    };


    return (
        <div className='center'>
            <input
                type="file"
                id={props.id}
                ref={filePicker}
                style={{ display: 'none' }}
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
                required
            />

            <div className={`image-upload ${props.center && 'center'}`}>
                <div className='image-upload__preview'>
                    {previewURL && <img src={previewURL} alt="preview" />}
                    {!previewURL && <p>Pick an image</p>}
                </div>
                <Button variant='outline-light btn-primary' type="button" onClick={upload}>Choose image</Button>
            </div>
           
        </div>

    );
}

export default ImageUpload;