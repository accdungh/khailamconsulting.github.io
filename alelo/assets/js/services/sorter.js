import moment from 'moment';

export default class Sorter {
  constructor(keys, activeOrder = {}) {
    this.orderKeys = keys;
    this.activeOrder = activeOrder;
    this.resetOrderKeys();
  }

  perform(array, orderBy, flag) {
    if (!orderBy) {
      orderBy = this.activeOrder.by;
      flag = this.activeOrder.value;
    }

    if (flag == undefined) {
      this.orderKeys[orderBy].value = !this.orderKeys[orderBy].value;
      var flag = this.orderKeys[orderBy].value;
    }

    this.orderKeys[orderBy].value = flag;

    let type = this.orderKeys[orderBy].type;

    let result = array.sort((a, b) => {
      if (flag) {
        var o1 = a[orderBy];
        var o2 = b[orderBy];
      } else {
        var o1 = b[orderBy];
        var o2 = a[orderBy];
      }

      if (type == "date") {
        o1 = moment(new Date(o1), "MM/DD/YYYY HH:mm").format();
        o2 = moment(new Date(o2), "MM/DD/YYYY HH:mm").format();
      }

      if (type == "time") {
        o1 = moment(o1, "HH:mm:ss").format();
        o2 = moment(o2, "HH:mm:ss").format();
      }

      if (type == "string") {
        o1 = o1.toLowerCase();
        o2 = o2.toLowerCase();
      }

      if (o1 < o2) {
        return -1;
      }

      if (o1 > o2) {
        return 1;
      }

      return 0;
    });

    this.resetOrderKeys(orderBy);
    this.activeOrder = { by: orderBy, value: flag };

    return result;
  }

  resetOrderKeys(exceptKey) {
    for (let key in this.orderKeys) {
      if (key == exceptKey) continue;
      this.orderKeys[key].value = true
    }
  }
}
