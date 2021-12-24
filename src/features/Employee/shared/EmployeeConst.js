export default class EmployeeConst {
    static get ORDER_STATUS() {
        return {
            NEW: "processing",
            DELIVERING: "delivery",
            SUCCESS: "done",
            CANCEL: "cancel",
        };
    }
}
