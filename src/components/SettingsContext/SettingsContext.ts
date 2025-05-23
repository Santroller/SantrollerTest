import { createContext, Context } from "react";
import { proto } from "./config.js";
export * from "./config.js"
export class DeviceStatus {
    constructor(id: string) {
        this.id = id
    }
    id: string;
    connected: boolean = false;
}
export class Config {
    constructor(config: proto.IConfig) {
        this.devices = Object.fromEntries(config.devices!.map((x, i) => [i, x]))
        this.deviceStatus = Object.fromEntries(config.devices!.map((_, i) => [i, new DeviceStatus(i.toString(10))]))
        this.config = config
    }
    devices: { [id: string]: proto.IDevice }
    deviceStatus: { [id: string]: DeviceStatus }
    config: proto.IConfig
}
export type SettingsAction =
    | { type: "updateConfig", config: proto.IConfig }
    | { type: "updateDevice", device: proto.IDevice, id: string }
    | { type: "deleteDevice", id: string }

export const SettingsContext: Context<Config> = createContext(new Config(proto.Config.create()));
export const SettingsDispatchContext: Context<React.ActionDispatch<[SettingsAction]>> = createContext((_) => { });

export function configReducer(config: Config, action: SettingsAction) {
    // should probably handle writing to the device here too.
    switch (action.type) {
        case 'updateDevice': {
            return { ...config, devices: { ...config.devices, [action.id]: { ...action.device } } };
        }
        case 'updateConfig': {
            return { ...config, config: action.config};
        }
        case 'deleteDevice': {
            const newConfig = { ...config }
            delete newConfig.devices[action.id]
            return newConfig;
        }
    }
}

export const initialConfig = new Config(
    proto.Config.create({
        faceButtonMappingMode: proto.FaceButtonMappingMode.LegendBased,
        devices: [
            {
                wii: {
                    mappingMode: proto.MappingMode.PerInput,
                    i2c: { sda: 1, scl: 1, block: 0, clock: 100000 }
                }
            },
            {
                bhDrum: {
                    i2c: { sda: 1, scl: 1, block: 0, clock: 100000 }
                }
            },
            {
                mpu6050: {
                    i2c: { sda: 1, scl: 1, block: 0, clock: 100000 }
                }
            },
            {
                worldTourDrum: {
                    spi: { mosi: 1, miso: 1, sck: 1, block: 0, clock: 100000 }
                }
            }
        ]
    }))