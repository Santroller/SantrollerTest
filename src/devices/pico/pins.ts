export const AnalogPins = [26, 27, 28, 29];
export const BluetoothPins = [23, 24, 29];
export const I2CPins = {
    0: {
        "sda": [0, 4, 8, 12, 16, 20],
        "scl": [1, 5, 9, 13, 17, 21]
    }, 1: {
        "sda": [2, 6, 10, 14, 19, 26],
        "scl": [3, 7, 11, 15, 20, 27]
    }
};
export const I2CGroups = Object.fromEntries(
    Object
        .entries(I2CPins)
        .flatMap(group => group[1].sda
            .concat(group[1].scl)
            .map(pin => [pin, group[0]])
        )
)
export const SPIPins = {
    0: {
        "miso": [0, 4, 16, 20],
        "csn": [1, 5, 17, 21],
        "sck": [2, 6, 18],
        "mosi": [3, 7, 19]
    },
    1: {
        "miso": [8, 12, 28],
        "csn": [9, 13],
        "sck": [10, 14, 26],
        "mosi": [11, 15, 27]
    }
}
export const SPIGroups = Object.fromEntries(
    Object
        .entries(SPIPins)
        .flatMap(group => group[1].miso
            .concat(group[1].csn)
            .concat(group[1].mosi)
            .concat(group[1].sck)
            .map(pin => [pin, group[0]])
        )
)

export const UARTPins = {
    0: {
        "tx": [0, 12, 16],
        "rx": [1, 13, 17]
    },
    1: {
        "tx": [4, 20],
        "rx": [5, 21]
    }
}
export const UARTGroups = Object.fromEntries(
    Object
        .entries(UARTPins)
        .flatMap(group => group[1].tx
            .concat(group[1].rx)
            .map(pin => [pin, group[0]])
        )
)
export const AllPins = Array(29).filter(x => x !== 25)