import { type NextPage } from "next";

import { useState } from "react";

import EditModal from "../components/EditModal";
import FlowerTable from "../components/FlowerTable";

const Flowers: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <div className="h-[100vh] bg-gradient-to-r p-16">
        <FlowerTable modalSetter={setCreateModalOpen} />
        <EditModal
          open={createModalOpen}
          openSetter={(value) => setCreateModalOpen(value)}
        />
      </div>
    </>
  );
};

export default Flowers;
