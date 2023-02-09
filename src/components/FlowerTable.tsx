import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { api } from "../utils/api";
import { Button } from "primereact/button";

export interface Props {
  modalSetter: (value: boolean) => void;
}

const Flowers = (props: Props) => {
  const flowersDataQuery = api.flowers.getAll.useQuery();
  const { data: flowersData } = flowersDataQuery;
  const flowersDelete = api.flowers.delete.useMutation({
    onSuccess: () => {
      flowersDataQuery.refetch();
    },
  });

  const deleteFlower = (idToDelete: string) => {
    flowersDelete.mutate({ id: idToDelete });
  };

  return (
    <>
      <Card title="Květiny">
        <div className="mb-2 flex flex-row justify-end">
          <Button label="Přidat" onClick={() => props.modalSetter(true)} />
        </div>
        <DataTable
          value={flowersData}
          responsiveLayout="scroll"
          scrollable
          scrollHeight="60vh"
        >
          <Column field="name" header="Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column
            header="action"
            body={(rowdata) => (
              <>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => deleteFlower(rowdata.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </>
            )}
          ></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default Flowers;
