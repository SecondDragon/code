export const filterDate = (date, fmt = "YYYY-MM-DD HH:mm") => {
  if (!date) {
    return "";
  }
  if (typeof date === "number") {
    if (date.toString().length < 13) {
      date = new Date(date * 1000);
    } else {
      date = new Date(date);
    }
  }
  var o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d",
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "\u661f\u671f"
          : "\u5468"
        : "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export const filterPlayCount = (e) => {
  if (!e) return "0";
  try {
    var t = Number(e),
      i = 1e4;
    return t >= i ? (t % i == 0 ? t / i + "w" : (t / i).toFixed(1) + "w") : t;
  } catch (o) {
    return 0;
  }
};

export const filterDuration = (e) => {
  if (isNaN(Number(e))) return "";
  var t = Number(1e3 * e) % 864e5,
    i = Math.floor(t / 36e5),
    o = t % 36e5,
    n = Math.floor(o / 6e4),
    a = o % 6e4,
    r = Math.round(a / 1e3),
    l = "";
  return (
    i && (l += i + ":"),
    n < 10 && (l += "0"),
    (l += n + ":"),
    r < 10 && (l += "0"),
    (l += r),
    l
  );
};
