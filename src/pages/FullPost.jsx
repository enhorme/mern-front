import React, { useEffect, useState } from "react";

import { Post } from "components/Post";
import { useParams } from "react-router-dom";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/posts/${id}`).then(
      (res) => {
        setData(res.data);
        setIsLoading(false);
        console.log("resdata=>>>>>>", res.data);
      },
      (e) => {
        setError(e.message);
        setIsLoading(false);
      }
    );
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  console.log("id===>>> ", id);
  console.log("data===>>> ", data);

  return (
    <Post
      id={data._id}
      title={data.title}
      imageUrl={data.imageUrl}
      user={data.user}
      createdAt={data.createdAt}
      viewsCount={data.views}
      commentsCount={3}
      tags={data.tags}
      isFullPost
    >
      <p>{data.text || null}</p>
    </Post>
  );
};
