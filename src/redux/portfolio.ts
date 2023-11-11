import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IPortfolioCompany } from "../containers/dashboard/defs";

import { useAppSelector } from "./store";

export interface PortfolioState {
  portfolio: IPortfolioCompany[];
}

type AddCompanyAction = PayloadAction<IPortfolioCompany>;
type UpdateCompanyAction = PayloadAction<IPortfolioCompany>;
type RemoveCompanyAction = PayloadAction<IPortfolioCompany>;

const initialState: PortfolioState = {
  portfolio: [],
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
        if (company.name === action.payload.name) {
          return action.payload;
        }
        return company;
      });
    },
    removeCompany: (state, action: RemoveCompanyAction) => {
      state.portfolio = state.portfolio.filter(
        (company) => company.name !== action.payload.name
      );
    },
  },
});

export const { addCompany, removeCompany } = portfolioSlice.actions;

export const usePortfolioState = () =>
  useAppSelector((state) => state.portfolio);

export default portfolioSlice.reducer;
