import DivisionPage from "../../components/shared/DivisionPage";
// import building from "../../assets/sports.jpg"; // use your image

export default function SportsDiv() {
  return (
    <DivisionPage
      title="যশোর ইনস্টিটিউট ক্রীড়া সংসদ এর ইতিহাস"
      author="রিপন রায়"
      // image={building}
      content={[
        "যশোর ইনস্টিটিউটের ক্রীড়া বিভাগ অত্যন্ত সমৃদ্ধ...",
        "ফুটবল, ক্রিকেটসহ বিভিন্ন খেলাধুলা পরিচালিত হয়...",
      ]}
    />
  );
}