import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import DataTable from "../../components/shared/DataTable";

export default function SportsPage() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("oldcommittee/sports/")
      .then((res) => {
        setData(res.data.data);
        setTitle(res.data.title);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <DataTable
      title={title}
      data={data}
    />
  );
}