import { useEffect, useRef } from "react";
import { api } from "../utils/api";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "react-notifications/lib/notifications.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";

export interface Props {
  open: boolean;
  openSetter: (value: boolean) => void;
}

const EditModal = (props: Props) => {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" });*/

  const flowerCreate = api.flowers.create.useMutation({
    onSuccess: () => flowersQuery.refetch(),
  });
  const flowersQuery = api.flowers.getAll.useQuery();

  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Form Submitted",
    });
  };

  const defaultValues = {
    name: "",
    description: "",
    imgUrl: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    reset();
  }, [props.open, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
    show();
    await flowerCreate.mutate(data);
    props.openSetter(false);
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
        header="Vytváření nové květiny"
        visible={props.open}
        style={{ width: "50vw" }}
        onHide={() => props.openSetter(false)}
        footer={
          <>
            <div>
              <Button
                label="No"
                icon="pi pi-times"
                onClick={() => props.openSetter(false)}
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
          className="flex-column mt-5 flex gap-2"
        >
          <div className="flex flex-col">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Jméno je povinné" }}
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
              rules={{ required: "Popis je povinný" }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.description })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
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
              name="imgUrl"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor={field.name}
                    className={classNames({ "p-error": errors.imgUrl })}
                  ></label>
                  <span className="p-float-label">
                    <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ "p-invalid": fieldState.error })}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <label htmlFor={field.name}>Odkaz na obrázek</label>
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
