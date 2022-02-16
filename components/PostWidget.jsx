import moment from 'jalali-moment'
import React from "react";
import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import Link from 'next/link'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(category, slug).then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
 

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="bg-white mb-8 font-semibold border-b pb-4 text-right">
        {slug ? "مطالب مرتبط" : "مطالب حدید"}
      </h3>
      {relatedPosts.map((post)=> (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img 
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
          <p className="text-gray-500 text-xs ">
            {moment(post.createdAt).locale('fa').format('YYYY/MM/DD') }
          </p>
          <Link href={`/post/${post.slug}`} key={post.title} > 
            <p className="text-md">
              {post.title}
            </p>
          </Link>
          

          </div>
        </div>
      ))}
    </div>
  )
};

export default PostWidget;
