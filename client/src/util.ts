import { Resource, ResourceType } from './types/resource';

export const getCurrentOutput = (resource: Resource) => {
    return !resource.online ? 0 : resource.max_output * (resource.percent_output / 100);
}

export const isCarbonNeutral = (type: ResourceType) => {
    return [
        ResourceType.NUCLEAR,
        ResourceType.HYDROELECTRIC,
        ResourceType.SOLAR,
        ResourceType.WIND
    ].includes(type);
}
