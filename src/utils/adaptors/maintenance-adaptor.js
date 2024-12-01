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
    createdAt: elem.createdAt,
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

function _parseMaintenanceWorkDays(workDays) {
  try {
    return JSON.parse(workDays);
  } catch (error) {
    console.error("Error parsing maintenance work days:", error);
    return [];
  }
}
