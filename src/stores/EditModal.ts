import { atom } from "jotai"

export const modalOpenAtom = atom(false)

export const editModalValuesAtom = atom({
  name: "",
  description: "",
  howOftenToWaterInDays: 0,
  dateOfLastWatering: new Date(),
})

