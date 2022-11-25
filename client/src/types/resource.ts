export type Resource = {
    id: number,
    nickname: string,
    type: ResourceType,
    max_output: number,
    percent_output: number,
    online: Boolean,
}

export enum ResourceType {
    SOLAR = "SOLAR",
    WIND = "WIND",
    GAS = "GAS",
    OIL = "OIL",
    NUCLEAR = "NUCLEAR",
    COAL = "COAL",
    HYDROELECTRIC = "HYDROELECTRIC"
}
