export type UserData = {
  email: string;
  password: string;
};

export type UserDataID = {
  id: number;
  email: string;
  password: string;
};

export type Installation = {
  name: string;
  location: string;
  capacity: number;
};

export type InstallationID = {
  name: string;
  id: number;
  location: string;
  capacity: number;
};

export type Measurement = {
  installation_id: number;
  measured_at: string;
  energy_kwh: number;
  power_kw: number;
};

export type MeasurementID = {
  id: number;
  installation_id: number;
  measured_at: string;
  energy_kwh: number;
  power_kw: number;
};