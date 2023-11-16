import React, { useEffect, useState } from "react";

import Suggestions from "./Suggestions";
import "./Timeline.css";
import { db } from "./../firebase"
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Dialog from '@mui/material/Dialog';
import { Avatar } from "@mui/material";
import "./Post/Post.css"
import CreatePost from "./Post/CreatePost";


function Timeline() {

  const postsCollectionRef = collection(db, "posts")
  const [increaseLike, setincreaseLike] = useState(0);

  const [posts, setPosts] = useState([]);

  const [open, setopen] = useState(false)

  const handleClose = () => {
    setopen(!open);
  };

  const getPosts = async () => {
    //Read data
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(filteredData);

      setPosts(filteredData);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
   
    getPosts();

  }, [])

  const incLike= async (postId,currLikes)=>{
    if(increaseLike%2===0)
    {
      const postDoc = doc(db,"posts",postId);
      await updateDoc(postDoc,{likes: currLikes+1});
      await getPosts();
    }
    else{
      const postDoc = doc(db,"posts",postId);
      await updateDoc(postDoc,{likes: currLikes-1});
      await getPosts();
    }
    setincreaseLike(increaseLike+1);
  }


  return (
    <div className="timeline">

    {/* Create Post Section */}

    <Dialog onClose={handleClose} open={open}>
      <CreatePost closeDialog={handleClose}/>
    </Dialog>


      <div className="timeline__left">
        <div className="timeline__posts">
          {posts.map(({ user, postImage, likes, timestamp,id }) => {
            {/* <Post
              user={post.user}
              postImage={post.postImage}
              likes={post.likes}
              timestamp={post.timestamp}
            /> */}
            return (<>
              <div>
                <div className="post">
                  <div className="post__header">
                    <div className="post__headerAuthor">
                      <Avatar style={{ marginRight: "10px" }}>
                        {user.charAt(0).toUpperCase()}
                      </Avatar>{" "}
                      {user} • <span>{timestamp}</span>
                    </div>
                    <MoreHorizIcon />
                  </div>
                  <div className="post__image">
                    <img src={postImage} alt="Post Image" />
                  </div>
                  <div className="post__footer">
                    <div className="post__footerIcons">
                      <div className="post__iconsMain">
                        <FavoriteBorderIcon className="postIcon" onClick={()=>incLike(id,likes)}/>
                        <ChatBubbleOutlineIcon onClick={handleClose} className="postIcon" />
                        <TelegramIcon className="postIcon" />
                      </div>
                      <div className="post__iconSave">
                        <BookmarkBorderIcon className="postIcon" />
                      </div>
                    </div>
                    Liked by {likes} people.
                  </div>
                </div>
              </div>
            </>)

          }

          )}
        </div>
      </div>
      <div className="timeline__right">
        <Suggestions />
      </div>
    </div>
  );
}

export default Timeline;
