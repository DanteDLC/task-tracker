export interface NewHire {
  id: string;
  name: string;
  email: string;
  department: string;
  startDate: string;
  status: string;
  accessStatus: { [serviceId: string]: string };
}

// Types based on your MongoDB schemas
export interface EmployeeTestType {
  id: string;
  email: string;
  fullName: string;
  position: Position;
  services: {
    service: Service;
    access: boolean;
  }[];
}

export interface Position {
  id: string;
  role: string;
  services: string[]; // Service IDs
}

export interface Service {
  id: string;
  name: string;
  manager: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
