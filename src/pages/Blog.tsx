import BlogTable from "../components/blog/BlogTable";
import { useGetAllBlogsQuery } from "../Redux/apis/blog/blogApi";
// import { Blog } from "../types/types";

// const blogData: Blog[] = [
//   {
//     id: "1",
//     userId: "user1",
//     title: "Understanding Cognitive Behavioral Therapy",
//     descriptions: "A deep dive into CBT techniques and their applications",
//     image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
//     createdAt: new Date("2023-01-15"),
//     updatedAt: new Date("2023-01-20"),
//   },
//   {
//     id: "2",
//     userId: "user2",
//     title: "Mindfulness in Daily Life",
//     descriptions: "Practical ways to incorporate mindfulness into your routine",
//     image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
//     createdAt: new Date("2023-02-10"),
//     updatedAt: new Date("2023-02-15"),
//   },
//   {
//     id: "3",
//     userId: "user3",
//     title: "Managing Anxiety During Stressful Times",
//     descriptions: "Strategies to cope with increased anxiety",
//     image: "https://images.unsplash.com/photo-1593814681464-eef5af2b0628",
//     createdAt: new Date("2023-03-05"),
//     updatedAt: new Date("2023-03-10"),
//   },
// ];

const BlogPage = () => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  console.log(data?.data);
  return (
    <div>
      <BlogTable blogData={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default BlogPage;
