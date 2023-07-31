import {create}  from  "zustand"

export const useTargetStore = create((set) => ({
   targets: [],
   setTargets: (targets) => set(() => ({targets})),
}))