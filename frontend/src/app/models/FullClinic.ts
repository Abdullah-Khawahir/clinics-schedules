import { ClinicScheduleDto } from "../dto/ClinicScheduleDto";

export class FullClinic {

    constructor(
        public id: number,
        // public arabicName: string,
        public englishName: string,
        public number: number,
        public buildingId: number,
        public ext: string,
        public schedules: ClinicScheduleDto[],
        public note: string,
    ) {
    }
}