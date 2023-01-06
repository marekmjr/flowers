import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { api } from "../utils/api";

export interface Props {
  open: boolean;
  openSetter: (value: boolean) => void
}

const CreateModal = (props: Props) => {
  /* const hello = api.example.hello.useQuery({ text: "from tRPC" });*/

  const modalValueChanged = () => console.log('modal value changed')


  const [formValue, setFormValue] = useState({
    name: '',
    description: '',
    imgUrl: '',
  })

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
    });
  };

  const flowerCreate = api.flowers.create.useMutation()

  const saveFlower = async() => {
    await flowerCreate.mutate(formValue)
}

  
  

  return (
    <>
    <input type="checkbox" id="my-modal" className="modal-toggle" checked={props.open} onChange={() => modalValueChanged}/>
    <div className="modal">
      <div className="modal-box">
      <h3 className="font-bold text-lg">Vytváření nové květiny</h3>
      <label className="label">
        <span className="label-text-alt">Název</span>
      </label>
      <input type="text" placeholder="Název" name="name" value={formValue.name} onChange={handleChange}  className="input input-primary" />
      
      <label className="label">
        <span className="label-text-alt">Popis</span>
      </label>
      <textarea className="textarea" name="description" value={formValue.description} onChange={handleChange} placeholder="Bio"></textarea>
      
      <label className="label">
        <span className="label-text-alt">Odkaz</span>
      </label>
      <input type="text" placeholder="Odkaz" name="imgUrl" value={formValue.imgUrl} onChange={handleChange} className="input input-primary" />
      
      <div className="modal-action">
        <button className="btn btn-secondary" onClick={() => props.openSetter(false)}>Zavřít</button>
        <button className="btn btn-primary" onClick={() => saveFlower()}>Uložit</button>
      </div>
    </div>
</div>
    </>
  );
};

export default CreateModal;
