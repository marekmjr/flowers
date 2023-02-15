import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { editModalValuesAtom, modalOpenAtom } from "../stores/EditModal";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "react-notifications/lib/notifications.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useAtom } from "jotai";

const EditModal = () => {
  const flowerCreate = api.flowers.create.useMutation({
    onSuccess: () => flowersQuery.refetch(),
  });
  const flowersQuery = api.flowers.getAll.useQuery();

  const flowersDataQuery = api.flowers.getAll.useQuery();
  const flowersUpdate = api.flowers.update.useMutation({
    onSuccess: () => {
      flowersDataQuery.refetch();
    },
  });

  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Form Submitted",
    });
  };

  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);

  const [defaultValues, setDefaultValues] = useAtom(editModalValuesAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  //Updates on defaultValues change
  useEffect(() => reset(defaultValues), [defaultValues, reset]);

  useEffect(() => {
    if (modalOpen == false) {
      setDefaultValues({
        id: "",
        name: "",
        description: "",
        howOftenToWaterInDays: 1,
        dateOfLastWatering: new Date(),
      });
      reset();
    }
  }, [modalOpen, reset]);

  const onSubmit = async (data: any) => {
    show();
    if (data.id === "") {
      await flowerCreate.mutate(data);
    } else {
      await flowersUpdate.mutate(data);
    }
    setModalOpen(false);
    reset();
  };

  type errorKeys = keyof typeof errors;
  const getFormErrorMessage = (name: string) => {
    return errors[name as errorKeys] ? (
      <small className="p-error">{errors[name as errorKeys]?.message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <>
      <Dialog
        header={
          defaultValues.id === "" ? "Creating new flower" : "Editing flower"
        }
        visible={modalOpen}
        onHide={() => setModalOpen(false)}
        footer={
          <>
            <div>
              <Button
                label="No"
                icon="pi pi-times"
                onClick={() => setModalOpen(false)}
                className="p-button-text"
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                autoFocus
                type="submit"
                form="flowerForm"
              />
            </div>
          </>
        }
      >
        <Toast ref={toast} />
        <form
          id="flowerForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-column mt-5 flex"
        >
          <div className="flex flex-col gap-2">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 16,
                  message: "Let's calm down with the name",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.name })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Jméno</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
                maxLength: {
                  value: 256,
                  message: "Let's calm down with the description",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.description })}
                  ></label>
                  <span className="p-float-label">
                    <InputTextarea
                      id={field.name}
                      value={field.value}
                      autoResize
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Popis</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Controller
              name="howOftenToWaterInDays"
              rules={{
                min: {
                  value: 1,
                  message: "Minimal value is one",
                },
                max: {
                  value: 365,
                  message: "This isn't a flower",
                },
              }}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({
                      "p-error": errors.howOftenToWaterInDays,
                    })}
                  ></label>
                  <span className="p-float-label">
                    <InputNumber
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    <label htmlFor={field.name}>Zalévání ve dnech</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <Controller
              name="dateOfLastWatering"
              rules={{}}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({
                      "p-error": errors.howOftenToWaterInDays,
                    })}
                  ></label>
                  <span className="p-float-label">
                    <Calendar
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    <label htmlFor={field.name}>Naposledy zalito</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditModal;
