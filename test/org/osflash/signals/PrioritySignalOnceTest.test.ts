/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { IPrioritySignal } from "../../../../src/org/osflash/signals/IPrioritySignal";
import { PrioritySignal } from "../../../../src/org/osflash/signals/PrioritySignal";

describe("PrioritySignalOnceTest", () => {
    let prioritySignal: IPrioritySignal;

    let gotListenerDispatchOrder: any[];

    const A = "A";
    const B = "B";
    const C = "C";

    function listenerA(): void {
        gotListenerDispatchOrder.push(A);
    }

    function listenerB(): void {
        gotListenerDispatchOrder.push(B);
    }

    function listenerC(): void {
        gotListenerDispatchOrder.push(C);
    }

    function assertArrayEqual(expected: any[], got: any[]): void {
        assert.equal(expected.length, got.length, "array length unequal");
        for (let i = 0; i < gotListenerDispatchOrder.length; i++) {
            assert.equal(expected[i], got[i], "@i=" + i);
        }
    }

    function assertNumListenersEqual(expected: number, got: number): void {
        assert.equal(expected, got);
    }

    beforeEach(() => {
        gotListenerDispatchOrder = [];
        prioritySignal = new PrioritySignal();
    });

    afterEach(() => {
        gotListenerDispatchOrder = null;
        prioritySignal.removeAll();
        prioritySignal = null;
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerA, 3);
        prioritySignal.addOnceWithPriority(listenerB, 2);
        prioritySignal.addOnceWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerA, 3);
        prioritySignal.addOnceWithPriority(listenerC, 1);
        prioritySignal.addOnceWithPriority(listenerB, 2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_3()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerB, 2);
        prioritySignal.addOnceWithPriority(listenerA, 3);
        prioritySignal.addOnceWithPriority(listenerC, 1);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_4()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerB, 2);
        prioritySignal.addOnceWithPriority(listenerC, 1);
        prioritySignal.addOnceWithPriority(listenerA, 3);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_5()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerC, 1);
        prioritySignal.addOnceWithPriority(listenerA, 3);
        prioritySignal.addOnceWithPriority(listenerB, 2);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_higher_priority_should_be_removed_independant_of_order_added_6()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerC, 1);
        prioritySignal.addOnceWithPriority(listenerB, 2);
        prioritySignal.addOnceWithPriority(listenerA, 3);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_priority_zero_should_be_called_after_high_and_before_negative_1()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerC, -10);
        prioritySignal.addOnceWithPriority(listenerB);
        prioritySignal.addOnceWithPriority(listenerA, 10);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });

    it("listeners_added_once_with_priority_zero_should_be_called_after_high_and_before_negative_2()", () => {
        let expectedListenerDispatchOrder: any[] = [A, B, C];

        prioritySignal.addOnceWithPriority(listenerC, -10);
        prioritySignal.addOnceWithPriority(listenerA, 10);
        prioritySignal.addOnceWithPriority(listenerB);

        prioritySignal.dispatch();

        assertArrayEqual(expectedListenerDispatchOrder, gotListenerDispatchOrder);
        assertNumListenersEqual(prioritySignal.numListeners, 0);
    });
});
