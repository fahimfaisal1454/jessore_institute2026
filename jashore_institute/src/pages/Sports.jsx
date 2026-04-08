import CommitteeMembers from "../components/shared/CommitteeMembers";

export default function Sports() {
  return (
    <CommitteeMembers
      title="ক্রীড়া বিভাগ"
      head={{
        name: "ক্রীড়া প্রধান",
        role: "সভাপতি",
        img: "/president.jpg",
      }}
      members={[
        { name: "খেলোয়াড় ১", role: "সদস্য", img: "/p1.jpg" },
        { name: "খেলোয়াড় ২", role: "সদস্য", img: "/p2.jpg" },
      ]}
    />
  );
}