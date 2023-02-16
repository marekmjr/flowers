import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { api } from "../utils/api";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { modalOpenAtom, editModalValuesAtom } from "../stores/EditModal";

import moment from "moment";
import { useAtom } from "jotai";
import { Flower } from "@prisma/client";
import Image from "next/image";

import { HealthBar } from "./healthbar/HealthBar";
import { Toast } from "primereact/toast";
import { useRef } from "react";

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
    toast.current?.show({
      severity: "success",
      summary: "Deleted",
      detail: "Flower was deleted",
    });
  };

  const editFlower = (flower: Flower) => {
    setEditModalValuesAtom({
      id: flower.id,
      name: flower.name,
      description: flower.description,
      howOftenToWaterInDays: flower.howOftenToWaterInDays,
      dateOfLastWatering: flower.dateOfLastWatering,
      maxTemperature: flower.maxTemperature,
      minTemperature: flower.minTemperature,
    });
    setEditModalOpen(true);
  };

  const getHp = (dateOfLastWatering: Date, howOftenToWaterInDays: number) => {
    // How often to water = 100%
    const timeSince = moment().diff(moment(dateOfLastWatering), "days");
    return Math.max(howOftenToWaterInDays - timeSince, 0);
  };

  const confirmDelete = (id: string, name: string) => {
    confirmDialog({
      message: `Are you sure you want to delete ${name}?`,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteFlower(id),
    });
  };
  const toast = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
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
                <span className="font-semibold">{rowdata.name}</span>
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
                  hp={getHp(
                    rowdata.dateOfLastWatering,
                    rowdata.howOftenToWaterInDays
                  )}
                  maxHp={rowdata.howOftenToWaterInDays}
                />
              </>
            )}
          ></Column>
          <Column
            header=""
            className="grid gap-x-4"
            body={(rowdata) => (
              <>
                <video
                  src="/img/icons/text-box.mp4"
                  width="40"
                  height="40"
                  loop
                  className="cursor-pointer"
                  onClick={() => editFlower(rowdata)}
                  onMouseOver={(event) =>
                    (event.target as HTMLVideoElement).play()
                  }
                  onMouseOut={(event) => {
                    (event.target as HTMLVideoElement).currentTime = 0;
                    (event.target as HTMLVideoElement).pause();
                  }}
                ></video>
                <video
                  src="/img/icons/water.mp4"
                  width="40"
                  height="40"
                  loop
                  className="cursor-pointer"
                  onClick={() => waterFlower(rowdata.id)}
                  onMouseOver={(event) =>
                    (event.target as HTMLVideoElement).play()
                  }
                  onMouseOut={(event) => {
                    (event.target as HTMLVideoElement).currentTime = 0;
                    (event.target as HTMLVideoElement).pause();
                  }}
                ></video>
                <video
                  src="/img/icons/trash.mp4"
                  width="40"
                  height="40"
                  loop
                  className="cursor-pointer"
                  onClick={() => confirmDelete(rowdata.id, rowdata.name)}
                  onMouseOver={(event) =>
                    (event.target as HTMLVideoElement).play()
                  }
                  onMouseOut={(event) => {
                    (event.target as HTMLVideoElement).currentTime = 0;
                    (event.target as HTMLVideoElement).pause();
                  }}
                ></video>
              </>
            )}
          ></Column>
        </DataTable>
      </Card>
    </>
  );
};

export default Flowers;
