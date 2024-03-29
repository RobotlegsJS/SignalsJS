/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ISlot } from "./ISlot";
import { ISignal } from "./ISignal";

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IPrioritySignal = Symbol("IPrioritySignal");
// eslint-disable-next-line no-redeclare
export interface IPrioritySignal extends ISignal {
    /**
     * Subscribes a listener for the signal.
     * After you successfully register an event listener,
     * you cannot change its priority through additional calls to add().
     * To change a listener's priority, you must first call remove().
     * Then you can register the listener again with the new priority level.
     *
     * @param    listener A function with an argument
     * that matches the type of event dispatched by the signal.
     * If eventClass is not specified, the listener and dispatch() can be called without an argument.
     * @return a ISlot, which contains the Function passed as the parameter
     * @see ISlot
     */
    addWithPriority(listener: Function, priority?: number): ISlot;

    /**
     * Subscribes a one-time listener for this signal.
     * The signal will remove the listener automatically the first time it is called,
     * after the dispatch to all listeners is complete.
     *
     * @param    listener A function with an argument
     * that matches the type of event dispatched by the signal.
     * If eventClass is not specified, the listener and dispatch() can be called without an argument.
     * @param    priority The priority level of the event listener.
     * The priority is designated by a signed 32-bit integer.
     * The higher the number, the higher the priority.
     * All listeners with priority n are processed before listeners of priority n-1.
     * @return a ISlot, which contains the Function passed as the parameter
     * @see ISlot
     */
    addOnceWithPriority(listener: Function, priority?: number): ISlot;
}
