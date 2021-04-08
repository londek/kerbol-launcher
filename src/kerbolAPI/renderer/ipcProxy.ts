import { ipcRenderer } from 'electron';

export async function invoke(channel: string, ...args: unknown[]): Promise<unknown> {
    console.log(`%c[ipcProxy]%c Sent %c${channel}%c with arguments %c${JSON.stringify(args.length > 0 ? args : null)}`, 'color:purple', '', 'color:yellow', '', 'color:yellow');
    const returnValue = await ipcRenderer.invoke(channel, ...args);
    console.log(`%c[ipcProxy]%c Received %c${channel}%c with result %c${JSON.stringify(returnValue)}`, 'color:purple', '', 'color:yellow', '', 'color:yellow');
    return returnValue;
}