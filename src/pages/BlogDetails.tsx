import { useParams } from "react-router-dom";
import HeroHeader from "../components/header/Header";
import { useGetBlogByIdQuery } from "../Redux/apis/blog/blogApi";

// const dummyBlogData = {
//   date: "Nov 25, 2024",
//   title: "Tips To Keep Yourself Relevant To All Positions",
//   content: `<p id="9e38" class="pw-post-body-paragraph vl vm ra vn b vo vp vq vr vs vt vu vv vw vx vy vz wa wb wc wd we wf wg wh wi gb bk" data-selectable-paragraph="" style="box-sizing: inherit; margin: 2.14em 0px -0.46em; font-weight: 400; color: rgb(36, 36, 36); word-break: break-word; font-style: normal; line-height: 32px; letter-spacing: -0.003em; font-family: source-serif-pro, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 20px; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Across Europe and Central Asia, vulnerable populations and health workers face a triple threat — influenza, respiratory syncytial virus (RSV) and COVID-19.</p>
// <p id="8ff1" class="pw-post-body-paragraph vl vm ra vn b vo vp vq vr vs vt vu vv vw vx vy vz wa wb wc wd we wf wg wh wi gb bk wj" data-selectable-paragraph="" style="box-sizing: inherit; margin: 2.14em 0px -0.46em; font-weight: 400; color: rgb(36, 36, 36); word-break: break-word; font-style: normal; line-height: 32px; letter-spacing: -0.003em; font-family: source-serif-pro, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; clear: left; font-size: 20px; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><span class="l wk wl wm bo wn wo wp wq wr dq" style="box-sizing: inherit; display: block; margin-right: 12px; position: relative; float: left; font-size: 66px; line-height: 0.83; padding-top: 7px;">In</span>the 2022/23 winter season, the<span>&nbsp;</span><a class="af ws" href="https://www.who.int/europe/news/item/01-12-2022-joint-statement---influenza-season-epidemic-kicks-off-early-in-europe-as-concerns-over-rsv-rise-and-covid-19-is-still-a-threat" rel="noopener ugc nofollow" target="_blank" style="box-sizing: inherit; color: inherit; text-decoration: underline; -webkit-tap-highlight-color: transparent;">influenza season epidemic started early</a>, and influenza cases and hospital admissions have been increasing since November. RSV has also been on the rise, and COVID-19 is still a threat.</p>
// <p id="531f" class="pw-post-body-paragraph vl vm ra vn b vo vp vq vr vs vt vu vv vw vx vy vz wa wb wc wd we wf wg wh wi gb bk" data-selectable-paragraph="" style="box-sizing: inherit; margin: 2.14em 0px -0.46em; font-weight: 400; color: rgb(36, 36, 36); word-break: break-word; font-style: normal; line-height: 32px; letter-spacing: -0.003em; font-family: source-serif-pro, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 20px; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">This is of concern as when influenza, RSV and COVID-19 co-circulate, the risk to vulnerable populations increases, and health services may come under severe pressure.</p>
// <p id="90eb" class="pw-post-body-paragraph vl vm ra vn b vo vp vq vr vs vt vu vv vw vx vy vz wa wb wc wd we wf wg wh wi gb bk" data-selectable-paragraph="" style="box-sizing: inherit; margin: 2.14em 0px -0.46em; font-weight: 400; color: rgb(36, 36, 36); word-break: break-word; font-style: normal; line-height: 32px; letter-spacing: -0.003em; font-family: source-serif-pro, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 20px; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">From Kyrgyzstan, Georgia, Albania and North Macedonia to Denmark, Spain and Portugal, those at risk are protecting themselves by getting vaccinated against influenza and COVID-19. Across the region, people also continue to practice measures such as covering sneezes and coughs with a tissue or bent elbow, cleaning hands regularly or wearing a mask when needed to keep respiratory infections at bay.</p>`,
// };

const BlogDetails = () => {
  const { id } = useParams();
//   console.log(id, "id");
  const { data } = useGetBlogByIdQuery(id, { skip: !id });
//   console.log(data, "datga");


  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div>
      <HeroHeader
        breadcrumbs={breadcrumbs}
        title={data?.data?.title}
        imageUrl={data?.data?.image}
      />
      {/* Blog details section */}
      <div className="container space-y-6 mb-10">
        <p className="text-lg">
          {new Date(data?.data?.createdAt).toDateString()}
        </p>
        <h1 className="md:text-3xl text-2xl lg:text-5xl font-medium">
          {data?.data?.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: data?.data?.descriptions }} />
      </div>
    </div>
  );
};

export default BlogDetails;
