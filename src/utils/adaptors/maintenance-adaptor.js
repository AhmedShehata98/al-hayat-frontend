import { workDaysAdaptor } from "./workdays-adaptor";
export const maintenanceAdaptor = (data = []) => {
  const transformedData = data.map((elem) => ({
    id: elem.id,
    serviceCategory: {
      id: elem.repairingService.id,
      name: elem.repairingService.name,
      workingHours: workDaysAdaptor(
        _parseMaintenanceWorkDays(elem.repairingService.workingHours)
      ),
      offDays: elem.repairingService.offDays || [],
      capacityPerDay: elem.repairingService.maxRequestsPerDay || 0,
      subCategory: {
        name: elem.repairingService.subRepairs?.[0] || undefined,
      },
      createdAt: elem.createdAt,
      updatedAt: elem.updatedAt,
    },
    requestServiceId: elem.repairingServiceId,
    isWarranty: elem.isInsideWarranty,
    description: elem.description,
    visitDate: elem.visitDate,
    visitTime: elem.visitTime,
    image: elem.imageUrl,
    createdAt: elem.createdAt,
    updatedAt: elem.updatedAt,
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
