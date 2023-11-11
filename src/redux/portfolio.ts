import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IPortfolioCompany } from "../containers/dashboard/defs";

export interface PortfolioState {
  portfolio: IPortfolioCompany[];
  selectedCompany: IPortfolioCompany | null;
}

type AddCompanyAction = PayloadAction<IPortfolioCompany>;
type UpdateCompanyAction = PayloadAction<IPortfolioCompany>;
type RemoveCompanyAction = PayloadAction<IPortfolioCompany>;

const initialState: PortfolioState = {
  portfolio: [],
  selectedCompany: null,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCompany: (state, action: AddCompanyAction) => {
      state.portfolio.push(action.payload);
    },
    updateCompany: (state, action: UpdateCompanyAction) => {
      state.portfolio = state.portfolio.map((company) => {
        if (company.uuid === action.payload.uuid) {
          return {
            ...company,
            ...action.payload,
          };
        }

        return company;
      });
    },
    removeCompany: (state, action: RemoveCompanyAction) => {
      state.portfolio = state.portfolio.filter(
        (company) => company.uuid !== action.payload.uuid
      );
    },
    selectCompany: (state, action: PayloadAction<IPortfolioCompany | null>) => {
      state.selectedCompany = action.payload;
    },
  },
});

export const { addCompany, removeCompany, updateCompany, selectCompany } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
