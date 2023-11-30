import { EventDto } from "./EventDto";
import { EmployeeDto } from "./EmployeeDto";

export type RepeatUnit = 'never' | 'daily' | 'weekly' | "weekdays" | "weekend";
export class ClinicScheduleDto {

    constructor(
        public id: number,
        public clinicId: number,
        public clinicName: string | undefined,
        public beginDate: string | number,
        public expireDate: string | number,
        public eventStart: string,
        public eventFinish: string,
        public repeat: RepeatUnit,
        public events: EventDto[],
        public employees: EmployeeDto[],
        public note: string,
    ) {

    }
}
