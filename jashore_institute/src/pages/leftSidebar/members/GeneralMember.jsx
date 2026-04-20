import MemberTable from "../../../components/shared/MemberTable";

export default function GeneralMember() {
  const data = [
    {
      voterNo: "202",
      memberNo: "6001",
      name: `মোঃ রফিকুল ইসলাম
পিতা: করিম উদ্দিন
যশোর`,
      date: "15-08-2005",
      type: "সাধারণ সদস্য",
      mobile: "",
      image: "",
    },
  ];

  return (
    <MemberTable
      title="সাধারণ সদস্য তালিকা"
      data={data}
    />
  );
}