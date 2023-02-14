import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { api } from "../utils/api";
import { Button } from "primereact/button";

import { modalOpenAtom, editModalValuesAtom } from "../stores/EditModal";

import moment from "moment";
import { useAtom } from "jotai";
import { Flower } from "@prisma/client";

import { HealthBar } from "./healthbar/HealthBar"

const Flowers = () => {
  const flowersDataQuery = api.flowers.getAll.useQuery();
  const { data: flowersData } = flowersDataQuery;
  const flowersDeleteQuery = api.flowers.delete.useMutation({
    onSuccess: () => {
      flowersDataQuery.refetch();
    },
  });


  const [, setEditModalOpen] = useAtom(modalOpenAtom);
  const [, setEditModalValuesAtom] = useAtom(editModalValuesAtom);

  const flowersWaterQuery = api.flowers.water.useMutation({
    onSuccess: () => {
      flowersDataQuery.refetch();
    },
  });

  const waterFlower = (idToWater: string) => {
    flowersWaterQuery.mutate({ id: idToWater });
  };

  const deleteFlower = (idToDelete: string) => {
    flowersDeleteQuery.mutate({ id: idToDelete });
  };

  const editFlower = (flower: Flower) => {
    setEditModalValuesAtom({
      id: flower.id,
      name: flower.name,
      description: flower.description,
      howOftenToWaterInDays: flower.howOftenToWaterInDays,
      dateOfLastWatering: flower.dateOfLastWatering,
    });
    setEditModalOpen(true);
  };

  const getHp = (dateOfLastWatering: Date, howOftenToWaterInDays: number) => {
    // How often to water = 100%
    const timeSince = moment().diff(moment(dateOfLastWatering), 'days')
    return Math.max(howOftenToWaterInDays - timeSince, 0)
  }

  return (
    <>
      <Card title="Flowers">
        <div className="mb-2 flex flex-row justify-end">
          <Button label="Add" onClick={() => setEditModalOpen(true)} />
        </div>
        <DataTable
          value={flowersData}
          responsiveLayout="scroll"
          scrollable
          scrollHeight="60vh"
        >
          <Column
            field="name"
            header="Name"
            body={(rowdata) => (
              <>
                <span
                  className="bold cursor-pointer underline"
                  onClick={() => editFlower(rowdata)}
                >
                  {rowdata.name}
                </span>
              </>
            )}
          ></Column>
          <Column field="description" header="Description"></Column>
          <Column
            field="howOftenToWaterInDays"
            header="Watering in days"
          ></Column>
          <Column
            field="dateOfLastWatering"
            header="Last watered"
            body={(rowdata) => (
              <>
                <h5>{moment(rowdata.dateOfLastWatering).fromNow()}</h5>
              </>
            )}
          ></Column>
          <Column 
            header="Health"
            body={(rowdata) => (
              <>
                <HealthBar 
                hp={getHp(rowdata.dateOfLastWatering, rowdata.howOftenToWaterInDays)}
                maxHp={rowdata.howOftenToWaterInDays}
                />
              </>
            )}></Column>
          <Column
            header=""
            className="grid gap-x-4"
            body={(rowdata) => (
              <>
                <i
                  title="Delete"
                  className="pi pi-trash cursor-pointer"
                  style={{ fontSize: "1.5rem", color: "#be123c" }}
                  onClick={() => deleteFlower(rowdata.id)}
                ></i>
                <i
                  title="Water"
                  className="pi pi-cloud-download cursor-pointer"
                  style={{ fontSize: "1.5rem", color: "#2563eb" }}
                  onClick={() => waterFlower(rowdata.id)}
                ></i>
              </>
            )}
          ></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default Flowers;
