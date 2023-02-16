import { useRef } from 'react';
import './PostComment.css'

const PostComment = ({ user, postID, setReRender }) => {
    const contentRef = useRef()
    console.log('user', user)
    console.log('postID', postID)

    const postComment = async () => {
        console.log('post comment')
        const comment = {
            _id: user._id,
            username: user.username,
            occupation: user.occupation,
            image: user.image,
            content: contentRef.current.value,
            likes: 0,
            postID: postID
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/${user._id}/post`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        console.log(response)
        if (response.ok) {
            const data = response.json()
            setReRender(prev => !prev)
            console.log('comment added', data)
            contentRef.current.value = ""
        }
        else {
            console.log('failed to add comment')
        }

    }
    return (
        <div className="postComment">
            <input ref={contentRef} type="text" placeholder="Your comment"></input>
            <button type="submit" onClick={postComment}>Post</button>
        </div>

    );
}

export default PostComment;