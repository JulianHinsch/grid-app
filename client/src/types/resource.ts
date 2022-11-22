export type Resource = {
    id: Number,
    nickname: String,
    type: ResourceType,
    maxOutputKw: Number,
    percentOutput: Number,
    online: Boolean,
}

export enum ResourceType {
    SOLAR = "SOLAR",
    WIND = "WIND",
    GAS = "GAS",
    OIL = "OIL",
    NUCLEAR = "NUCLEAR",
    COAL = "COAL",
}
