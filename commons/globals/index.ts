const JSBangkokApp = {
  testCommands: {} as { [key: string]: Function }
};

if (typeof window !== 'undefined') {
  Object.assign(window, { JSBangkokApp });
}

// eslint-disable-next-line import/prefer-default-export
export function registerTestCommand(commandName: string, fn: Function) {
  JSBangkokApp.testCommands[commandName] = fn;
}
