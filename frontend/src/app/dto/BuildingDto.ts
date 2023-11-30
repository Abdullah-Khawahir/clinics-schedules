export class BuildingDto {

    constructor(
        public id: number,
        public englishName: string,
        public number: number,
        public hospitalId: number,
        public hospitalName: string | undefined,

    ) { }

}