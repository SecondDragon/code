export type IncreaseBoolean = Boolean | 1 | 0

export function mounted(isStartUp: IncreaseBoolean) {
  if (isStartUp) {
    console.log("yes");
  } else {
    console.log("no");
  }
}

mounted(1)

export { }