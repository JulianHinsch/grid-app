import { Resource, ResourceType } from './types/resource';

export const getCurrentOutput = (resource: Resource) => {
    if (!resource.online) {
        return 0;
    }
    return Math.round(resource.max_output * (resource.percent_output / 100));
}

export const isCarbonNeutral = (type: ResourceType) => {
    return [
        ResourceType.NUCLEAR,
        ResourceType.HYDROELECTRIC,
        ResourceType.SOLAR,
        ResourceType.WIND
    ].includes(type);
}

export const getMaxTotalOutput = (resources: Resource[]) => {
    let ret = 0;
    resources.forEach(resource => {
        ret += resource.max_output;
    });
    return ret;
}

export const getCurrentTotalOutput = (resources: Resource[]) => {
    let ret = 0;
    resources.forEach(resource => {
        ret += getCurrentOutput(resource);
    });
    return ret;
}
