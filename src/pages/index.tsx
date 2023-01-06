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

  const flowersQuery = api.flowers.getAll.useQuery()
  const flowersDelete = api.flowers.delete.useMutation()

  const deleteFlower = (idToDelete: string) => {
    flowersDelete.mutate({id: idToDelete})
    flowersQuery.refetch()
  }

  

  return (
    <>
      <Head>
        <title>NG Flowers</title>
        <meta name="description" content="Aplikace pro zprávu květin v NG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main data-theme="business">
        <div className="flex min-h-screen flex-col items-center justify-center" >
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tigh">
              Správa <span className="text-accent">KVĚTIN</span>
            </h1>
            <button className="btn btn-md" onClick={() => setCreateModalOpen(true)}>Přidat květinu</button>
  {          <table className="table w-full">
              <thead>
              <tr>
                <th>Jméno</th>
                <th>Popis</th>
                <th>Akce</th>
              </tr>
              </thead>
              <tbody>
              {
                flowersQuery.data?.map((flower) => 
                  <tr key={flower.id}>
                    <th>{flower.name}</th>
                    <th>{flower.description}</th>
                    <th>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => deleteFlower(flower.id)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    </th>
                  </tr>
                )
              }
              </tbody>

            </table> }
          </div>
        </div>  
        <CreateModal open={createModalOpen} openSetter={(value) => setCreateModalOpen(value)}/>
      </main>
    </>
  );
};

export default Home;
