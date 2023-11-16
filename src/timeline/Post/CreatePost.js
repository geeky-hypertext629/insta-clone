import React, { useEffect } from 'react'
import './CreatePost.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ref,uploadBytes,listAll,getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';




const CreatePost = ({closeDialog}) => {
  const [body,setBody]=useState("");
   const [imageurl, setUrl] = useState("")
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg);
  const [fileUpload, setfileUpload] = useState(null)
//   const navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts")


  // posting image to cloudinary

  const handleShare = async () =>{
    if(!body || !fileUpload){notifyA('Please fill out the body')}
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try {
        await uploadBytes(filesFolderRef,fileUpload);
        const imageListRef = ref(storage,`projectFiles/`)
        listAll(imageListRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setUrl(url);
                    // console.log(url)
                    addDoc(postsCollectionRef,{
                        user : "New_User",
                        likes : 2,
                        postImage : url,
                        timestamp : "2d"
                    }).then(()=>{
                        closeDialog();
                        setfileUpload(null);
                        setBody("");
                        notifyA('Success')
                    })
                })
            })
        })
        
        // await addDoc(postsCollectionRef,{
        //     user : "New_User",
        //     likes : 2,
        //     postImage : imageurl,
        //     timestamp : "2d"
        // })
        // closeDialog();

    } catch (error) {
        console.log(error)
    }
  }



  return (
    <div className='createPost'>
        <div className="post-header">
           <h4
           style={{ margin: "3px auto" }}>
                Create Post
           </h4>
           <button id='post-btn' 
           onClick={handleShare}
           >Share</button>
        </div>
        <div className="main-div">
        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" alt="" id="output"/>
          <input type="file"
            accept='image/*'
            onChange={(event) => {
             setfileUpload(event.target.files[0])
          }}
            
          />
        </div>
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img src="" alt="" />
            </div>
            <h5>
            Hello Buddy
            </h5>
          </div>
          <textarea  type="text" 
            placeholder="Write a caption..."
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </div>
    </div>
  )
}

export default CreatePost