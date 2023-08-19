import { Injectable } from '@angular/core';


type LogObject = { data: string, type: LogType }
const Colors = {
  Reset: "\x1b[0m"
  , Bright: "\x1b[1m"
  , Dim: "\x1b[2m"
  , Underscore: "\x1b[4m"
  , Blink: "\x1b[5m"
  , Reverse: "\x1b[7m"
  , Hidden: "\x1b[8m"

  , FgBlack: "\x1b[30m"
  , FgRed: "\x1b[31m"
  , FgGreen: "\x1b[32m"
  , FgYellow: "\x1b[33m"
  , FgBlue: "\x1b[34m"
  , FgMagenta: "\x1b[35m"
  , FgCyan: "\x1b[36m"
  , FgWhite: "\x1b[37m"
  , FgGray: "\x1b[90m"

  , BgBlack: "\x1b[40m"
  , BgRed: "\x1b[41m"
  , BgGreen: "\x1b[42m"
  , BgYellow: "\x1b[43m"
  , BgBlue: "\x1b[44m"
  , BgMagenta: "\x1b[45m"
  , BgCyan: "\x1b[46m"
  , BgWhite: "\x1b[47m"
  , BgGray: "\x1b[100m"
}
type LogType = "Error" | "Warning" | "INFO" | "Debug"
@Injectable({
  providedIn: 'root'
})
export default class Logger {
  private static MAX_SIZE: number = 1200;
  private static logsBuffer: Array<LogObject> = []
  private static isDebug: boolean = true;


  static info(data: Object) {
    this.log(data, 'INFO');
  }
  static warn(data: Object) {
    this.log(data, 'Warning');
  }
  static error(data: Object) {
    this.log(data, 'Error')
  }
  static debug(data: Object) {
    this.log(data, 'Debug')
  }

  private static log(data: Object, type?: LogType) {


    if (type == undefined || type == "INFO") {
      const logString = `[INFO]\t` + data.toString();
      console.log(`${logString}`);
      this.logsBuffer.push({ data: logString, type: "INFO" })
    }
    if (type === "Error") {
      const color = Colors.FgRed
      const logString = `[ERROR]\t` + data.toString();
      console.error(`${color}${logString}${Colors.Reset}`);
      this.logsBuffer.push({ data: logString, type: "Error" })
    }
    if (type === "Warning") {
      const color = Colors.FgYellow
      const logString = "[WARNING]\t" + data.toString();
      console.warn(`${color}${logString}${Colors.Reset}`);
      this.logsBuffer.push({ data: logString, type: "Warning" })
    }
    if (type == "Debug") {
      Logger.debugLog(data);
    }

    if (this.logsBuffer.length >= this.MAX_SIZE) {
      this.logsBuffer.shift();
    }



  }
  static debugLog(data: Object) {
    if (this.isDebug)
      console.debug(`${Colors.FgCyan}[DEBUG]\t${data}${Colors.Reset}`)
  }
  static lastLog() {
    return this.logsBuffer.at(-1);
  }


  private constructor() { }

}