import CommitteeMembers from "../components/shared/CommitteeMembers";

export default function Drama() {
  return (
    <CommitteeMembers
      title="নাট্যকলা সংসদ"
      head={{
        name: "নাট্য প্রধান",
        role: "সভাপতি",
        img: "/president.jpg",
      }}
      members={[
        { name: "অভিনেতা ১", role: "সদস্য", img: "/p1.jpg" },
        { name: "অভিনেতা ২", role: "সদস্য", img: "/p2.jpg" },
      ]}
    />
  );
}