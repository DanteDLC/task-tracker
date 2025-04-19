import { managerType, servicesType, positionsType } from "./types";

export interface NewServiceFormProps {
  managers: managerType[];
}

export interface NewPositionFormProps {
  services: servicesType[];
}

export interface NewEmployeeFormProps {
  positions: positionsType[];
}
