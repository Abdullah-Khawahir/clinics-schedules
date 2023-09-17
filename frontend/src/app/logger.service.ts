import { Injectable } from '@angular/core';


interface LogObject { data: string, type: LogType }

type LogType = "Error" | "Warning" | "INFO" | "Debug"

@Injectable({
  providedIn: 'root'
})
export default class Logger {
  private static MAX_SIZE: number = 120;
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
      const logString = `[INFO]\t` + JSON.stringify(data);
      console.log(`${logString}`);
      this.logsBuffer.push({ data: logString, type: "INFO" })
    }
    if (type === "Error") {
      const logString = `[ERROR]\t` + JSON.stringify(data);
      console.error(logString);
      this.logsBuffer.push({ data: logString, type: "Error" })
    }
    if (type === "Warning") {
      const logString = "[WARNING]\t" + JSON.stringify(data);
      console.warn(logString);
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
      console.debug(`$[DEBUG]\t${JSON.stringify(data)}`)
  }
  static lastLog() {
    return this.logsBuffer.at(-1);
  }


  private constructor() { }

}