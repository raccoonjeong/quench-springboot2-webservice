export function cleanXSS(value) {
    //You'll need to remove the spaces from the html entities below
    value = value.replace(/</gi, "& lt;").replace(/>/gi, "& gt;");
    value = value.replace("\\(", "& #40;").replace("\\)", "& #41;");
    value = value.replace("'", "& #39;");
    value = value.replace("eval\\((.*)\\)", "");
    value = value.replace("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
    value = value.replace("script", "");

    return value;
}