import { create } from 'zustand';
export interface BtnEdit {
  btnEdit: Partial<Record<number, boolean>>;
}

export interface NameForm {
  form: Partial<Record<string, BtnEdit>>;
}

type BtnStore = {
  state: NameForm;
  updateBtn: (formKey: string, value: { key: number; value: boolean }) => void;
 
};


export const useBtnEdit = create<BtnStore>()((set) => ({
  state: { form: {} },
  updateBtn: (formKey, { key, value }) =>
    set((x) => {
      const nameForm = x.state.form[formKey]?.btnEdit || {};
      return {
        state: {
          form: {
            ...x.state.form,
            [formKey]: {
              btnEdit: {
                ...nameForm,
                [key]: value,
              },
            },
          },
        },
      };
    }),
}));