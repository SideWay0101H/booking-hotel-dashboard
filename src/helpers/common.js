import moment from "moment";

export function formatDateTime(datetime) {
    return moment(datetime).format('DD/MM/YYYY hh:mm:ss ')
}