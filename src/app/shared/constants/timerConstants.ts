const MY_PICKER_CONFIG = {
    meridian: true,
    spinners: true,
    seconds: false,
    hourStep: 1,
    minuteStep: 15,
    secondStep: 1,
    disabled: false,
    readonlyInputs: false,
    size: 'small'
};

const TIME_CONSTANTS = {
    officeFromTime: '08:00',
    officeToTime: getToTime(),
    // currently fixed fot hours only can be updated to use mins and secs as well
    officeHours: 10,
    // To set time limits, will be used by validators to throw errors
    minFromTime: 8,
    maxFromTime: 20
};

function getToTime() {
    return `${getHourFromTime(TIME_CONSTANTS.officeFromTime) + TIME_CONSTANTS.officeHours} :
    ${getMinuteFromTime(TIME_CONSTANTS.officeFromTime)}`;
}

function getHourFromTime(input: string) {
    return parseInt(input.split(':')[0], 10);
}

function getMinuteFromTime(input: string) {
    return parseInt(input.split(':')[1], 10);
}

export { MY_PICKER_CONFIG, TIME_CONSTANTS, getToTime, getHourFromTime, getMinuteFromTime }


