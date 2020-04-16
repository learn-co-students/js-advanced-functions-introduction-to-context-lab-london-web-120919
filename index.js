// Your code here
const createEmployeeRecord = (employee) => {
    return { firstName: employee[0], familyName: employee[1], title: employee[2], payPerHour: employee[3], timeInEvents: [], timeOutEvents: []}
}

const createEmployeeRecords = (employees) => {
    return employees.map( employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (record, timestamp) => {
    const [date, hour] = timestamp.split(" ")
    record.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour,10), date })
    return record
}

const createTimeOutEvent = (record, timestamp) => {
    const [date, hour] = timestamp.split(" ")
    record.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date })
    return record
}

const hoursWorkedOnDate = (record, date) => {
    const timeIn = record.timeInEvents.find(time => time.date === date).hour
    const timeOut = record.timeOutEvents.find(time => time.date === date).hour
    return (timeOut - timeIn)/100
}

const wagesEarnedOnDate = (record, date) => {
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

const allWagesFor = (record) => {
    const wages = record.timeInEvents.map(day => wagesEarnedOnDate(record, day.date))
    return wages.reduce((total, day) => total + day, 0)
}

const calculatePayroll = (records) => {
    const wages = records.map(record => allWagesFor(record))
    return wages.reduce((total, day) => total + day, 0)
}

const findEmployeeByFirstName = (srcArray, name) => {
    return srcArray.find( record => record.firstName === name)
}