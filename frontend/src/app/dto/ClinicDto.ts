export class ClinicDto {
    constructor(
        public id: number,
        public englishName: string,
        public number: number,
        public buildingId: number,
        public buildingName: string | undefined,
        public ext: string,
        public note:string,
    ) { }
}