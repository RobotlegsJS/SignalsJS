/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ISlot } from "./ISlot";

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IOnceSignal = Symbol("IOnceSignal");
// eslint-disable-next-line no-redeclare
export interface IOnceSignal {
    /**
     * An optional array of classes defining the types of parameters sent to listeners.
     */
    valueClasses: any[];

    /**
     * The current number of listeners for the signal.
     */
    numListeners: number;

    /**
     * Subscribes a one-time listener for this signal.
     * The signal will remove the listener automatically the first time it is called,
     * after the dispatch to all listeners is complete.
     *
     * @param    listener A function with arguments
     * that matches the value classes dispatched by the signal.
     * If value classes are not specified (e.g. via Signal constructor), dispatch() can be called without arguments.
     * @return a ISlot, which contains the Function passed as the parameter
     */
    addOnce(listener: Function): ISlot;

    /**
     * Dispatches an object to listeners.
     *
     * @param    valueObjects    Any number of parameters to send to listeners. Will be type-checked against valueClasses.
     * @throws    ArgumentError    <code>ArgumentError</code>:    valueObjects are not compatible with valueClasses.
     */
    dispatch(...valueObjects: any[]): void;

    /**
     * Unsubscribes a listener from the signal.
     *
     * @param    listener
     * @return a ISlot, which contains the Function passed as the parameter
     */
    remove(listener: Function): ISlot;

    /**
     * Unsubscribes all listeners from the signal.
     */
    removeAll(): void;
}
