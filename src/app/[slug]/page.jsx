import Newsletter from "@/components/home/Newsletter";
import CommentForm from "@/components/post/CommentForm";
import CommentList from "@/components/post/CommentList";
import RelatedBlogs from "@/components/post/RelatedBlogs";
import axios from "axios";
import React from "react";

const fetchPost = async (slug) => {
    const { data } = await axios.get(
        `${process.env.SERVER_URL}/api/posts/${slug}`
    );
    return data;
};

const BlogPage = async ({ params }) => {
    const { slug } = params;

    const post = await fetchPost(slug);

    // console.log(post);

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm ">
                                    <img
                                        className="mr-4 w-16 h-16 rounded-full"
                                        src={post?.user?.image}
                                        alt="Jese Leos"
                                    />
                                    <div>
                                        <a
                                            href="#"
                                            rel="author"
                                            className="text-xl font-bold "
                                        >
                                            {post?.user.name}
                                        </a>
                                        <p className="text-base">
                                            {post?.category.title}
                                        </p>
                                        <p className="text-base">
                                            {post?.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight  lg:mb-6 lg:text-4xl">
                                {post?.title}
                            </h1>
                        </header>
                        <div dangerouslySetInnerHTML={{ __html: post?.desc }} />

                        <p>
                            <strong>Start from the inside out</strong>. A nice
                            way to both organize your tasks and create more
                            user-friendly prototypes is by building your
                            prototypes ‘inside out’. Start by focusing on what
                            will be important to your user, like a Buy now
                            button or an image gallery, and list each element by
                            order of priority. This way, you’ll be able to
                            create a prototype that puts your users’ needs at
                            the heart of your design.
                        </p>

                        <button className="flex mx-auto gap-3 border active:border-0 active:ring-0 rounded-lg px-5 py-2 font-bold text-xl items-center my-5">
                            Like{" "}
                            <span className="text-red-600 text-2xl">♥</span>
                        </button>

                        <section className="not-format">
                            <CommentForm postSlug={slug} />
                            <CommentList postSlug={slug} />
                        </section>
                    </article>
                </div>
            </main>

            <RelatedBlogs />
            <Newsletter />
        </>
    );
};

export default BlogPage;
