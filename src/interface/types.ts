export interface managerType {
  _id: string;
  email: string;
}

export interface servicesType {
  _id: string;
  name: string;
}

export interface positionsType {
  _id: string;
  role: string;
  services: servicesType[];
}

export interface employeeStatusType {
  service: string;
  access: boolean;
}
