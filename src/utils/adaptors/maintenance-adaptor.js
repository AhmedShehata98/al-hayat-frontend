import { workDaysAdaptor } from "./workdays-adaptor";
export const maintenanceAdaptor = (data = []) => {
  const transformedData = data.map((elem) => ({
    id: elem.id,
    repairingServiceId: elem.repairingServiceId,
    repairingServiceName: elem.repairingServiceName,
    subRepair: elem.subRepair,
    isWarranty: elem.isInsideWarranty,
    description: elem.description,
    visitDate: elem.visitDate,
    visitTime: elem.visitTime,
    image: elem.imageUrl,
    user: {
      name: `${elem.user.firstName} ${elem.user.lastName}`,
      phoneNumber: elem.user.phoneNumber,
    },
    address: {
      country: elem.address.country,
      city: elem.address.city,
      postalCode: elem.address.postalCode,
    },
    status: elem.status,
    customerRequestNumber: elem.customerRequestNumber,
    createdAt: elem.createdAt,
  }));

  return transformedData;
};
export const maintenanceDetailsAdaptor = (data = []) => {
  const transformedData = data.map((elem) => ({
    id: elem.id,
    repairingServiceId: elem.repairingServiceId,
    repairingServiceName: elem.repairingServiceName,
    subRepair: elem.subRepair,
    isWarranty: elem.isInsideWarranty,
    description: elem.description,
    visitDate: elem.visitDate,
    visitTime: elem.visitTime,
    image: elem.imageUrl,
    user: {
      name: `${elem.user.firstName} ${elem.user.lastName}`,
      phoneNumber: elem.user.phoneNumber,
    },
    address: {
      country: elem.address.country,
      city: elem.address.city,
      postalCode: elem.address.postalCode,
      geoLocation: {
        lat: isNaN(elem.address.latitude) ? -1 : elem.address.latitude,
        lng: isNaN(elem.address.longitude) ? -1 : elem.address.longitude,
      },
    },
    status: elem.status,
    customerRequestNumber: elem.customerRequestNumber,
    createdAt: elem.createdAt,
  }));

  return transformedData;
};
