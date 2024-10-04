// components/BlogSection.jsx
'use client'
import Image from "next/image"; // Import Next.js Image component for optimized images
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogPage = () => {

  const router = useRouter();

  const blogs = [
    {
      id: 1,
      date: "Dec 22, 2023",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-6.png",
    },
    {
      id: 2,
      date: "Mar 15, 2023",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-7.png",
    },
    {
      id: 3,
      date: "Jan 05, 2023",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      imageUrl: "/coach-8.png",
    },
  ];


  const handleSingleBlog = (id) => {
    console.log(id);
    router.push(`/user-blogs/${id}`);
  };

  return (
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 max-w-7xl mx-auto">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="font-semibold text-lg text-primary mb-2 block">
                Our Blogs
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                Our Recent News
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {blogs.map((blog, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <Image
                    src={blog.imageUrl}
                    alt="image"
                    width={370} // Set width according to your design
                    height={220} // Set height according to your design
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                    {blog.date}
                  </span>
                  <h3> 
                    <div className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary cursor-pointer" onClick={() => handleSingleBlog(blog.id)}>
                      {blog.title}
                    </div>
                  </h3>
                  <p className="text-base text-body-color">
                    {blog.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
