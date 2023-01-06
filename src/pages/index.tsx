import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CreateModal from "../components/CreateModal";

import { api } from "../utils/api";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const logger = (val: string) => console.log(val)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const {data: flowers} = api.flowers.getAll.useQuery()
  

  return (
    <>
      <Head>
        <title>NG Flowers</title>
        <meta name="description" content="Aplikace pro zprávu květin v NG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tigh">
            Správa <span className="text-[hsl(280,100%,70%)]">KVĚTIN</span>
          </h1>
          <button className="btn btn-md" onClick={() => setCreateModalOpen(true)}>Přidat květinu</button>
{          <table className="table w-full">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {
              flowers?.map((flower) => 
                <tr key={flower.id}>
                  <th>{flower.name}</th>
                  <th>{flower.description}</th>
                </tr>
              )
            }
            </tbody>

          </table> }
        </div>
        <CreateModal open={createModalOpen} openSetter={(value) => setCreateModalOpen(value)}/>
      </main>
    </>
  );
};

export default Home;
