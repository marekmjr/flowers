import { useEffect, useRef } from "react";
import { api } from "../utils/api";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { editModalValuesAtom, modalOpenAtom } from "../stores/EditModal";
import { Dropdown } from "primereact/dropdown";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "react-notifications/lib/notifications.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";
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

  const { data: flowersInfoData } = api.flowersInfo.getAll.useQuery();

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
        minTemperature: 0,
        maxTemperature: 0,
      });
      reset();
    }
  }, [modalOpen, reset, setDefaultValues]);

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
      <small className="p-error -mt-3">
        {errors[name as errorKeys]?.message}
      </small>
    ) : (
      <small className="p-error -mt-3">&nbsp;</small>
    );
  };

  return (
    <>
      <Toast ref={toast} />
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
        <button onClick={() => show()}>Tester</button>
        <form
          id="flowerForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-column mt-5 flex"
        >
          <div className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 32,
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
                    <Dropdown
                      editable
                      filter
                      optionLabel="latin"
                      options={flowersInfoData}
                      id={field.name}
                      maxLength={32}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => {
                        if (e.target.value instanceof Object) {
                          field.onChange(e.target.value.latin);
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                    />
                    <label htmlFor={field.name}>Name</label>
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
                      maxLength={256}
                      id={field.name}
                      value={field.value}
                      autoResize
                      className={classNames(
                        { "p-invalid": fieldState.error },
                        "w-full"
                      )}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Description</label>
                  </span>
                  {getFormErrorMessage(field.name)}
                </>
              )}
            />
            <div className="flex flex-row">
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
                        max={365}
                        min={1}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor={field.name}>
                        How often to water (in days)
                      </label>
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
                        maxDate={new Date()}
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor={field.name}>Last time watered</label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </div>
            <div className="mt-8 flex flex-row">
              <Controller
                name="minTemperature"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        "p-error": errors.minTemperature,
                      })}
                    ></label>
                    <span className="p-float-label">
                      <InputNumber
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor={field.name}>
                        Minimal temperature for flower (°C)
                      </label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
              <Controller
                name="maxTemperature"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className={classNames({
                        "p-error": errors.maxTemperature,
                      })}
                    ></label>
                    <span className="p-float-label">
                      <InputNumber
                        id={field.name}
                        value={field.value}
                        className={classNames({
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor={field.name}>
                        Maximal temperature for flower (°C)
                      </label>
                    </span>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditModal;
